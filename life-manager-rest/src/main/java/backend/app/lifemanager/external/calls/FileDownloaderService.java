package backend.app.lifemanager.external.calls;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;

@Slf4j
@Service
public class FileDownloaderService {

    @Value("${openweather.api.locations.download.url}")
    private String downloadUrl;

    @Value("${openweather.api.locations.download.path}")
    private String downloadPath;

    public void downloadFileFromUrlUsingNio() throws IOException {
        URL url = new URL(downloadUrl);
        ReadableByteChannel rbc = Channels.newChannel(url.openStream());
        FileOutputStream fos = new FileOutputStream(new File(downloadPath).getAbsolutePath());
        fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
        fos.close();
        rbc.close();
    }
}
