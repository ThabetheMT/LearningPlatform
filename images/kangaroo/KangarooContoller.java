package com.investhood.mywebapp.kangaroo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class KangarooContoller {

    @GetMapping("kangaroo-quiz")
    public String kangarooQuiz(){
        return "kangarooQuiz.html";
    }

    @GetMapping("kangaroo-flashcards")
    public String flashCard(){
        return "kangarooFlashcard.html";
    }
}
