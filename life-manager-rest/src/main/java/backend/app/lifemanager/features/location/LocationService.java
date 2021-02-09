package backend.app.lifemanager.features.location;

import backend.app.lifemanager.features.weather.dao.locations.Location;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.zip.GZIPInputStream;

@Slf4j
@Service
public class LocationService {

    @Value("${openweather.api.locations.download.url}")
    private String downloadUrl;

    @Value("${openweather.api.locations.download.path}")
    private String downloadPath;

    @Value("${openweather.api.locations.decompressed.path}")
    private String decompressedPath;

    private List<Location> locationsList;
    private Timestamp timestamp;

    @PostConstruct
    void initialLocationListLoad(){
        locationsList = updateLocationList();
        timestamp = new Timestamp(System.currentTimeMillis());
        if (locationsList.isEmpty()) {
            log.error("Failed to download available locations. Please investigate the issue. Download Url: {}, Download Path: {}", downloadUrl, downloadPath);
        }
    }

    public List<Location> getLocationsList() {
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
        if (compareTwoTimeStamps(currentTime, timestamp) > 24) {
            List<Location> newLocationsList = updateLocationList();
            timestamp = new Timestamp(System.currentTimeMillis());
            if (!newLocationsList.isEmpty()) {
                locationsList = newLocationsList;
            }
        }
        return locationsList;
    }

    public List<Location> updateLocationList() {
        Optional<ReadableByteChannel> readableByteChannel = openDownloadStreamFromUrl();
        String filePath = new File(downloadPath).getAbsolutePath();
        List<Location> locations = new ArrayList<>();
        if (readableByteChannel.isPresent() && downloadFileViaStream(readableByteChannel.get(), filePath)) {
            //        TODO: delete old json, if there is one.
            decompressGzip(filePath).ifPresentOrElse(
                    file -> {
                        locations.addAll(parseDownloadedJson(file));
            //        TODO: delete the gz file if decompressing is successful
                    },
                    () -> log.warn("Failed to find a decompressed json file to parse"));
        }
        return locations;
    }

    private Optional<ReadableByteChannel> openDownloadStreamFromUrl() {
        ReadableByteChannel readableByteChannel = null;
        try {
            URL url = null;
            url = new URL(downloadUrl);
            readableByteChannel = Channels.newChannel(url.openStream());
        } catch (MalformedURLException exception) {
            log.error("Incorrect location download url: {}. Exception: {}", downloadUrl, exception.getMessage());
        } catch (IOException exception) {
            log.error("The location download url does not respond. Url: {}. Exception: {}", downloadUrl, exception.getMessage());
        }
        return readableByteChannel != null  ? Optional.of(readableByteChannel) : Optional.empty();
    }

    private boolean downloadFileViaStream(ReadableByteChannel readableByteChannel, String filePath) {
        boolean hasFinished = false;
        try {
            FileOutputStream fos = new FileOutputStream(filePath);
            fos.getChannel().transferFrom(readableByteChannel, 0, Long.MAX_VALUE);
            fos.close();
            readableByteChannel.close();
            hasFinished = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return hasFinished;
    }

    private Optional<File> decompressGzip(String filePath) {
        Path gzipPath = Paths.get(filePath);
        File decompressedFile = new File(decompressedPath);
        try (
                GZIPInputStream gis = new GZIPInputStream(new FileInputStream(gzipPath.toFile()));
                FileOutputStream fos = new FileOutputStream(decompressedFile.getAbsolutePath())
        ) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = gis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }
            return Optional.of(decompressedFile);
        } catch (Exception exception) {
            log.error("Failed to get gzip input stream of file output stream of decompressed file. Exception: " + exception.getMessage());
            return Optional.empty();
        }
    }

    private List<Location> parseDownloadedJson(File jsonFile) {
        ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        List<Location> locations = new ArrayList<>();
        try {
            locations.addAll(Arrays.asList(objectMapper.readValue(jsonFile, Location[].class)));
            log.info("Completed reading json file.");
        } catch (IOException exception) {
            log.error("Failed to parse json file. Exception: " + exception.getMessage());
        }
        return locations;
    }

    public static long compareTwoTimeStamps(Timestamp currentTime, Timestamp oldTime)
    {
        long milliseconds1 = oldTime.getTime();
        long milliseconds2 = currentTime.getTime();

        long diff = milliseconds2 - milliseconds1;
        long diffSeconds = diff / 1000;
        long diffMinutes = diff / (60 * 1000);
        long diffHours = diff / (60 * 60 * 1000);
        long diffDays = diff / (24 * 60 * 60 * 1000);

        return diffHours;
    }
}
