package backend.app.lifemanager.external.calls;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
public class FileDownloaderService {

    @Value(("${openweather.api.locations.download.path}"))
    private static String filePath;

    @Value("${openweather.api.locations.download.url}")
    private static String downloadUrl;

    public void downloadFileFromUrlUsingNio() {

        URL urlObj = null;
        ReadableByteChannel rbcObj = null;
        FileOutputStream fOutStream  = null;

        // Checking If The File Exists At The Specified Location Or Not
//        Path filePathObj = Paths.get(filePath);
//        boolean fileExists = Files.exists(filePathObj);
        boolean fileExists = false;
        if(!fileExists) {
            try {
                urlObj = new URL(downloadUrl);
                rbcObj = Channels.newChannel(urlObj.openStream());
                fOutStream = new FileOutputStream(filePath);

                fOutStream.getChannel().transferFrom(rbcObj, 0, Long.MAX_VALUE);
                log.info("! File Successfully Downloaded From The Url !");
            } catch (IOException ioExObj) {
                log.error("Problem Occured While Downloading The File= " + ioExObj.getMessage());
            } finally {
                try {
                    if(fOutStream != null){
                        fOutStream.close();
                    }
                    if(rbcObj != null) {
                        rbcObj.close();
                    }
                } catch (IOException ioExObj) {
                    log.error("Problem Occured While Closing The Object= " + ioExObj.getMessage());
                }
            }
        } else {
            log.warn("File Not Present! Please Check!");
        }
    }
}
