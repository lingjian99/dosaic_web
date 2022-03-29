package com.gordon.dosaic;

public class DosaicImage {

   
    String imgFile;

    public DosaicImage(String str){
        imgFile = str;
    }

    public void dosaic(){
        Dosaic lib = new Dosaic();
        lib.dosaic(imgFile);

    }
}
