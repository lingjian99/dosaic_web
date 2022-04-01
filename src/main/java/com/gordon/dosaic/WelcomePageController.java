package com.gordon.dosaic;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WelcomePageController {
    @RequestMapping("/")
    public String index(){
        return "startup";
    }
    @RequestMapping("/test_ajax")
    public String test_ajax(){
        return "ajax_test";
    }
    @RequestMapping("/dosaic")
    public String upload()
    {
        return "uploaded";
    }
}
