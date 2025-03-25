import { Flip } from 'gsap/Flip';
import gsap from 'gsap';


gsap.registerPlugin(Flip) 

const flip = (from, to) => { //postit 생성 모션Flip
    const flipFrom = document.querySelector(from)
    const flipTo = document.querySelector(to)
    const state = Flip.getState(from + ', ' + to);

    flipFrom.classList.toggle("flipActive");
    flipTo.classList.toggle("flipActive");
    
    Flip.from(state, {
        duration: 0.6,
        fade: true,
        scale: true,
        absolute: true,
        toggleClass: "flipping",
        ease: "power3.inOut"
    });
}

export default flip