package backend.app.lifemanager.external.calls;

import backend.app.lifemanager.features.dao.locations.Location;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.zip.GZIPInputStream;

@Slf4j
@Service
public class FileDownloaderService {

    @Value("${openweather.api.locations.download.url}")
    private String downloadUrl;

    @Value("${openweather.api.locations.download.path}")
    private String downloadPath;

    @Value("${openweather.api.locations.decompressed.path}")
    private String decompressedPath;

    public List<Location> downloadNewLocationList() throws IOException {
        URL url = new URL(downloadUrl);
        ReadableByteChannel rbc = Channels.newChannel(url.openStream());
        String filePath = new File(downloadPath).getAbsolutePath();
        FileOutputStream fos = new FileOutputStream(filePath);
        fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
        fos.close();
        rbc.close();
        Path path = Paths.get(filePath);
//        TODO: delete old json, if there is one.
        Optional<File> decompressedSuccessfully = decompressGzip(path);
//        TODO: delete the gz file if decompressing is successful

        List<Location> locations = new ArrayList<>();
        decompressedSuccessfully.ifPresent(file -> locations.addAll(parseDownloadedJson(file)));
        return locations;
    }

    private Optional<File> decompressGzip(Path gzipPath) {
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
}
