package com.gordon.dosaic;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;

import java.io.File;
import java.io.IOException;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.multipart.MultipartFile;
 
@Controller
@RequestMapping("/")
public class FileUploadRestController {
 
    private String jpegFile;
    public void setImageFile(String file){
        jpegFile=file; 
    }
    public String getImageFile(){
        return jpegFile;
    }


    /**
     * Location to save uploaded files on server
     */
 
 
    /*
     * single file upload in a request
     */
    @RequestMapping("fileupload")
    public void uploadFile(@RequestParam("multipartFile") MultipartFile uploadfile) {
 
        if (uploadfile.isEmpty()) {
            System.out.println("please select a file!!!");
        }
 
        try {
 
            byte[] bytes = uploadfile.getBytes();
            jpegFile = uploadfile.getOriginalFilename();
            
            Path path = Paths.get(getRealPath() + jpegFile);
            Files.write(path, bytes);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    String getRealPath()

    {
 
        String b_path = "/home/images/";

        File dir = new File(b_path);
            if(!dir .exists()) dir.mkdirs();
        
        return b_path;
    }

    String getJpegMeta()
    {
        String str;
        File file = new File(getRealPath() + jpegFile);

        StringBuilder jpegExif=new StringBuilder();
        try{
            Metadata metadata = ImageMetadataReader.readMetadata(file);
            for (Directory directory : metadata.getDirectories()) {
                jpegExif.append("<p style=\" color:red;\">------");
                jpegExif.append(directory.toString());
                jpegExif.append("------</p>");
                
                for (Tag tag : directory.getTags()) {
                   str = tag.toString();
                   jpegExif.append("<p>");
                   jpegExif.append(str); 
                   jpegExif.append("</p>");  
                       
                }
            }

        }
        catch (Exception e){
            //
        }
        str=jpegExif.toString();
        return str;    
    }

       
     @RequestMapping(value = "exif")
	public void jpegExif(HttpServletRequest request, HttpServletResponse response)throws IOException {
    
  /*
        String ipAddr; // = getLocalHostLANAddress().getHostAddress();
        PrintWriter out = response.getWriter();
        //ipAddr = "{\"MetaDate\": \"" + getJpegMeta() + "\", \"File\":\"http://" + ipAddr + "/images/" + jpegFile +"\"}";
        ipAddr = "{\"MetaDate\":\"" + getJpegMeta() + "\", \"File\": \"/photo/" + jpegFile + ".jpg\"}";
        out.write(ipAddr);
        out.flush();
        out.close();
    */    
    //    dosaic(getRealPath() + jpegFile);
        response.setHeader("meta_data", getJpegMeta());
        response.setHeader("result_image", "/photo/" + jpegFile + ".jpg");
        response.flushBuffer();

           

    }
    void dosaic(String file)
    {
        DosaicImage di = new DosaicImage(file);
        di.dosaic();    

    }
/*
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.util.Enumeration;
    private static InetAddress getLocalHostLANAddress() throws UnknownHostException {
        try {
            InetAddress candidateAddress = null;
            // 遍历所有的网络接口
            for (Enumeration<NetworkInterface> ifaces = NetworkInterface.getNetworkInterfaces(); ifaces.hasMoreElements();) {
                NetworkInterface iface = (NetworkInterface) ifaces.nextElement();
                // 在所有的接口下再遍历IP
                for (Enumeration<InetAddress> inetAddrs = iface.getInetAddresses(); inetAddrs.hasMoreElements();) {
                    InetAddress inetAddr = (InetAddress) inetAddrs.nextElement();
                    if (!inetAddr.isLoopbackAddress()) {// 排除loopback类型地址
                        if (inetAddr.isSiteLocalAddress()) {
                            // 如果是site-local地址，就是它了
                            return inetAddr;
                        } else if (candidateAddress == null) {
                            // site-local类型的地址未被发现，先记录候选地址
                            candidateAddress = inetAddr;
                        }
                    }
                }
            }
            if (candidateAddress != null) {
                return candidateAddress;
            }
            // 如果没有发现 non-loopback地址.只能用最次选的方案
            InetAddress jdkSuppliedAddress = InetAddress.getLocalHost();
            if (jdkSuppliedAddress == null) {
                throw new UnknownHostException("The JDK InetAddress.getLocalHost() method unexpectedly returned null.");
            }
            return jdkSuppliedAddress;
        } catch (Exception e) {
            UnknownHostException unknownHostException = new UnknownHostException(
                    "Failed to determine LAN address: " + e);
            unknownHostException.initCause(e);
            throw unknownHostException;
        }
    }
*/
}
