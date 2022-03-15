package ICTPrj.server.controller;

import ICTPrj.server.dto.FileDto;
import ICTPrj.server.dto.FilePathDto;
import ICTPrj.server.service.FileService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @GetMapping("/result/{uuid}")
    public FilePathDto MakeUp(@PathVariable String uuid){
        return fileService.MakeUp(uuid);
    }

    @PostMapping("/getUrl/makeup")
    public ArrayList<FilePathDto> PreSignedUrlForMakeup(@RequestBody FileDto fileDto){
        return getFilePaths(fileDto);
    }

    // 이거 없어도 될 거 같은데
    @PostMapping("/getUrl")
    public ArrayList<FilePathDto> PreSignedUrlForPost(@RequestBody FileDto fileDto){
        return getFilePaths(fileDto);
    }

    private ArrayList<FilePathDto> getFilePaths(@RequestBody FileDto fileDto) {
        ArrayList<FilePathDto> filePaths = new ArrayList<FilePathDto>();
        for(FilePathDto filePath:fileDto.getFiles()){
            FilePathDto filePathDto = new FilePathDto();
            filePathDto.setPath(fileService.GeneratePreSignedUrl(filePath.getPath()));
            filePaths.add(filePathDto);
        }
        return filePaths;
    }
}