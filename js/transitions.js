$("document").ready(function(){

class Transitions {
    constructor(){
        this.entryAnimations();
        this.animate_opacity = ".table-responsive, h1, h4, h6, .nav-link";
        this.animate_margin = ".table-responsive, h1, h4, h6, .nav-link";
    }
    entryAnimations(){
        setTimeout(() => { //Arrow function to keep 'this' bound to main object
            $(this.animate_opacity).animate({"opacity": "1"});
            $(this.animate_margin).animate({"margin-left": "0px"}, 
                {duration: 800,
                    easing: "linear",
                        queue: false});
        }, 500);
    }
}

transitions = new Transitions();

});