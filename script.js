var locoScroll;
function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    horizontalScroll:300,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

var loadingTime = 0;
function loader() {
  var loader = setInterval(function () {
    loadingTime += Math.floor(Math.random() * 20);
    if (loadingTime <= 100) {
      document.querySelector("#timer").textContent = loadingTime + "%";
    } else {
      loadingTime = 100;
      document.querySelector("#timer").textContent = loadingTime + "%";
      gsap.to("#timer", {
        delay: 1,
        opacity: 0,
        transform: "translateY(-100%)",
      });
      gsap.to("#loader>button", {
        opacity: 1,
        delay: 1,
        transform: "translateY(-100%)",
      });
      gsap.to("#timer", {
        delay: 1,
        opacity: 0,
        transform: "translateY(-100%)",
      });
      clearInterval(loader);
    }
  }, 100);
}

var audio = new Audio("Audio/african-savanna.mp3");
function page1Anime() {
  var tl = gsap.timeline();
  document
    .querySelector("#loader>button")
    .addEventListener("click", function () {
      tl.to("#page1", {
        scale: 1,
        borderRadius: "0px",
      });
      gsap.to("#loader", {
        opacity: 0,
      });
      tl.to("#page1LeafImg", {
        rotate: "-10deg",
      });
      tl.to("#page1StampImg img", {
        transform: "translate(0%,0%)",
        scale: 1,
        opacity: 1,
        duration: 1,
      });
      tl.to("#scrollImg", {
        scale: 1,
      });
      tl.to("#page1DownText", {
        opacity: 1,
      });
      tl.to("#nav", {
        top: 0,
      });
      tl.to("#main", {
        height:"auto",
        onStart: function () {
          locoScroll.start();
          music();
        },
      });
    });
}

function page2Anime() {
  gsap.from("#page2 video", {
    y: "100%",
    scale: 0,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page2",
      start: "top 60%",
    },
  });
}

function printPage3Pt1H1() {
  var clutter = "";
  document
    .querySelector("#page3Pt1>h1")
    .textContent.split("")
    .forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
  document.querySelector("#page3Pt1>h1").innerHTML = clutter;
}

function printPage7Pt1H1() {
  var clutter = "";
  document
    .querySelector("#page7Pt1>h1")
    .textContent.split("")
    .forEach(function (e) {
      clutter += `<span>${e}</span>`;
    });
  document.querySelector("#page7Pt1>h1").innerHTML = clutter;
}

function page6Anime() {
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page6",
      start: "top 0%",
      end: "top 2%",
      scrub: true,
    },
  });
  tl.to("#nav svg", {
    fill: "black",
  },"a").to("#nav", {
    background: `linear-gradient(
      to bottom, #1914054d,transparent )`,
  },"a")
  .to(".music-bar",{
    backgroundColor:"black",
  },"a").to("#navRight span",{
    color:"black"
  },"a")
}

function page8Anime() {
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page8",
      start: "top 0%",
      end: "top 2%",
      scrub: true,
    },
  });
  tl.to("#nav svg", {
    fill: "white",
    color: "white",
  }).to("#nav", {
    background: `linear-gradient(
      to bottom, #f8f0eb31,transparent )`,
  })
  .to(".music-bar",{
    backgroundColor:"white",
  },"a").to("#navRight span",{
    color:"white"
  },"a")
  gsap.from("#page8F h1", {
    opacity: 0,
    transform: "translateY(100%)",
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page8",
      start: "top 10%",
    },
  });
  gsap.from(".page8Img img", {
    transform: "translateY(100%)",
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page8",
      start: "top 10%",
    },
  });
  gsap.from("#page8S p", {
    y: "100%",
    opacity: 0,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page8S",
      start: "top 70%",
    },
  });
  gsap.from(".page8Elem", {
    y: "100%",
    opacity: 0,
    scrollTrigger: {
      scroller: "#main",
      trigger: ".page8Elem",
      start: "top 70%",
    },
  });

}


function page11Pt() {
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page11Pt",
      start: "top 0%",
      end: "top 2%",
      scrub: true,
    },
  });
  tl.to("#nav svg", {
    fill: "white",
    color: "white",
  }).to("#nav", {
    background: `linear-gradient(
      to bottom, #f8f0eb31,transparent )`,
  })
  .to(".music-bar",{
    backgroundColor:"white",
  },"a").to("#navRight span",{
    color:"white"
  },"a")
}



if(window.innerWidth<600){
  function page3Anime() {
    var tl2 = gsap.timeline({
      scrollTrigger: {
        scroller: "#main",
        trigger: "#page3",
        start: "top 0%",
        end: "top 0%",
        scrub: 1,
      },
    });
  
    tl2
      .to("#nav", {
        background: `linear-gradient(
        to bottom, #1914054d,transparent )`,
      })
      .to("#navLeft svg , #navRight svg , #navRight span", {
        color: "black",
        fill: "black",
        stagger: 0.3,
      },"a")
      .to(".music-bar",{
        backgroundColor:"black"
      },"a")

      gsap.to("#page3Pt1>h1>span",{
        color:"black",
        stagger:.02,
        scrollTrigger:{
          scroller:"#main",
          trigger:"#page3Pt1",
          start:"top 90%"
        }
      })
      gsap.from(".img1 img",{
          transform:"translateY(100%)",
          scrollTrigger:{
            scroller:"#main",
            trigger:".img1",
            start:"top 85%",
            end:"top 50%",
            scrub:1
          }
      })
      gsap.from(".img2 img",{
          transform:"translateY(100%)",
          scrollTrigger:{
            scroller:"#main",
            trigger:".img2",
            start:"top 85%",
            end:"top 50%",
            scrub:1
          }
      })
      gsap.from(".img3 img",{
          scale:0,
          scrollTrigger:{
            scroller:"#main",
            trigger:".img3",
            start:"top 85%",
            end:"top 50%",
            scrub:1
          }
      })
      gsap.from(".img4 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img4",
          start:"top 85%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".h1I",{
        transform:"translateY(100%)",
        opacity:0,
        scrollTrigger:{
          scroller:"#main",
          trigger:".h1I",
          start:"top 85%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".img5 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img5 img",
          start:"top 80%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".img6 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img5 img",
          start:"top 80%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".img7 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img5 img",
          start:"top 80%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".h1II",{
        transform:"translateY(100%)",
        opacity:0,
        scrollTrigger:{
          scroller:"#main",
          trigger:".h1II",
          start:"top 90%",
          end:"top 70%",
          scrub:1
        }
      })
      gsap.from(".img8 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img8 img",
          start:"top 100%",
          end:"top 70%",
          scrub:1
        }
      })
      gsap.from(".img9 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img9 img",
          start:"top 100%",
          end:"top 70%",
          scrub:1
        }
      })
      gsap.from(".img10 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img10 img",
          start:"top 100%",
          end:"top 80%",
          scrub:1
        }
      })
      gsap.from(".img11 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img11 img",
          start:"top 100%",
          end:"top 80%",
          scrub:1
        }
      })
      gsap.from(".img12 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".img12 img",
          start:"top 100%",
          end:"top 80%",
          scrub:1
        }
      })
    

  }

  function page4Anime() {
    var tl = gsap.timeline({
      scrollTrigger: {
        scroller: "#main",
        trigger: "#page4",
        start: "top 0%",
        end: "top 2%",
        scrub: true,
      },
    });
    tl.to("#nav svg", {
      fill: "white",
      color: "white",
    },"a").to("#nav", {
      background: `linear-gradient(
        to bottom, #f8f0eb31,transparent )`,
    },"a")
    .to(".music-bar",{
      backgroundColor:"white",
    },"a").to("#navRight span",{
      color:"white"
    },"a")
    gsap.from(".page4-heading",{
      transform:"translateY(100%)",
      opacity:0,
      duration:10,
      scrollTrigger: {
        scroller: "#main",
        trigger: "#page4",
        start: "top 50%",
        end: "top 40%",
        scrub: 1,
      }
    })
  }

  function page5Anime() {
    gsap.set(".elem1 h1, .elem1 p", {
      opacity: 1,
      scale: 1,
    });
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#page5",
        scroller: "#main",
        pin: true,
        scrub: 1,
        start: "top 0%",
        end: "top -100%",
      },
    });
    tl
      .to(
        ".elem1 h1",
        {
          opacity: 0.5,
        },
        "x"
      )
      .to(
        ".elem1 p",
        {
          opacity: 0,
        },
        "x"
      )
      .to(
        ".elem2 h1",
        {
          opacity: 1,
        },
        "x"
      )
      .to(
        ".elem2 p",
        {
          opacity: 1,
        },
        "x"
      );
    tl
      .to(
        ".elem2 h1",
        {
          opacity: 0.5,
        },
        "y"
      )
      .to(
        ".elem2 p",
        {
          opacity: 0,
        },
        "y"
      )
      .to(
        ".elem3 h1",
        {
          opacity: 1,
        },
        "y"
      )
      .to(
        ".elem3 p",
        {
          opacity: 1,
        },
        "y"
      );
  }

  function page7Anime() {
    
      gsap.to("#page7Pt1>h1>span",{
        color:"black",
        stagger:.02,
        scrollTrigger:{
          scroller:"#main",
          trigger:"#page7Pt1",
          start:"top 90%"
        }
      })
      gsap.from(".I7img1 img",{
          transform:"translateY(100%)",
          scrollTrigger:{
            scroller:"#main",
            trigger:".I7img1",
            start:"top 85%",
            end:"top 50%",
            scrub:1
          }
      })
      gsap.from(".I7img2 img",{
          transform:"translateY(100%)",
          scrollTrigger:{
            scroller:"#main",
            trigger:".I7img2",
            start:"top 85%",
            end:"top 50%",
            scrub:1
          }
      })
      gsap.from(".I7img3 img",{
          scale:0,
          scrollTrigger:{
            scroller:"#main",
            trigger:".I7img3",
            start:"top 85%",
            end:"top 50%",
            scrub:1
          }
      })
      gsap.from(".I7img4 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img4",
          start:"top 85%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".I7h1I",{
        transform:"translateY(100%)",
        opacity:0,
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7h1I",
          start:"top 85%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".I7img5 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img5 img",
          start:"top 80%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".I7img6 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img5 img",
          start:"top 80%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".I7img7 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img5 img",
          start:"top 80%",
          end:"top 50%",
          scrub:1
        }
      })
      gsap.from(".I7h1II",{
        transform:"translateY(100%)",
        opacity:0,
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7h1II",
          start:"top 90%",
          end:"top 70%",
          scrub:1
        }
      })
      gsap.from(".I7img8 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img8 img",
          start:"top 100%",
          end:"top 70%",
          scrub:1
        }
      })
      gsap.from(".I7img9 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img9 img",
          start:"top 100%",
          end:"top 70%",
          scrub:1
        }
      })
      gsap.from(".I7img10 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img10 img",
          start:"top 100%",
          end:"top 80%",
          scrub:1
        }
      })
      gsap.from(".I7img11 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img11 img",
          start:"top 100%",
          end:"top 80%",
          scrub:1
        }
      })
      gsap.from(".I7img12 img",{
        transform:"translateY(100%)",
        scrollTrigger:{
          scroller:"#main",
          trigger:".I7img12 img",
          start:"top 100%",
          end:"top 80%",
          scrub:1
        }
      })
    

  }

  
  function page10Anime(){
    var tl = gsap.timeline({
      scrollTrigger: {
        scroller: "#main",
        trigger: "#page10",
        start: "top 80%",
        end: "top 0%",
        scrub: true,
      },
    });
    tl.from("#page10 img",{
      opacity:0,
      scale:0
    })
  }


  function page11Anime(){
    var tl = gsap.timeline({
      scrollTrigger: {
        scroller: "#main",
        trigger: "#page11",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });
    tl.from("#page11 img",{
      opacity:0,
      scale:0
    })
  }



}
else{
  
function page3Anime() {
  var tl2 = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page3",
      start: "top 0%",
      end: "top -300%",
      pin: true,
      scrub: 0.5,
    },
  });

  tl2
    .to("#nav", {
      background: `linear-gradient(
      to bottom, #1914054d,transparent )`,
    })
    .to("#page3Pt1>h1>span,#navLeft svg , #navRight svg , #navRight span", {
      color: "black",
      fill: "black",
      stagger: 0.3,
    },"a")
    .to(".music-bar",{
      backgroundColor:"black"
    },"a")

    .to("#page3Pt1,#page3Pt2", {
      transform: "translateX(-100vw)",
      duration: 200,
    })
    .from(
      ".img1",
      {
        top: "10%",
        duration: 200,
      },
      "a"
    )
    .from(
      ".img2",
      {
        bottom: "0%",
        duration: 200,
      },
      "a"
    )
    .from(
      ".img3 img",
      {
        scale: 0,
        duration: 200,
      },
      "a"
    )
    .from(
      ".img img",
      {
        transform: "translate(50%,100%)",
        duration: 200,
      },
      "a"
    )
    .to("#page3Pt2", {
      transform: "translateX(-200vw)",
      duration: 200,
    })
    .from(
      ".img5",
      {
        top: "10%",
      },
      "b"
    )
    .from(
      ".img5 img",
      {
        transform: "translate(50%,100%)",
        duration: 50,
      },
      "b"
    )
    .to("#page3Pt2", {
      transform: "translateX(-300vw)",
      duration: 200,
    })
    .from(
      ".img6",
      {
        top: "10%",
      },
      "c"
    )
    .from(
      ".img6 img",
      {
        transform: "translateY(110%)",
        duration: 50,
      },
      "c"
    )
    .from(
      ".img7",
      {
        top: "10%",
      },
      "d"
    )
    .from(
      ".img7 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "d"
    )
    .to("#page3Pt2", {
      transform: "translateX(-400vw)",
      duration: 200,
    })
    .to("#page3Pt2", {
      transform: "translateX(-500vw)",
      duration: 200,
    })
    .from(
      ".img8",
      {
        top: "10%",
      },
      "e"
    )
    .from(
      ".img8 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "e"
    )
    .to("#page3Pt2", {
      transform: "translateX(-600vw)",
      duration: 200,
    })
    .from(
      ".img9",
      {
        top: "10%",
      },
      "f"
    )
    .from(
      ".img9 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "f"
    )
    .from(
      ".img10",
      {
        top: "10%",
      },
      "g"
    )
    .from(
      ".img10 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "g"
    )
    .from(
      ".img11",
      {
        top: "10%",
      },
      "h"
    )
    .from(
      ".img11 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "h"
    )
    .from(
      ".img12",
      {
        top: "10%",
      },
      "i"
    )
    .from(
      ".img12 img",
      {
        transform: "translateY(110%)",
        duration: 50,
      },
      "i"
    )
    .to("#page3Pt2", {
      transform: "translateX(-630vw)",
      duration: 200,
    });
}

function page4Anime() {
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4",
      start: "top 0%",
      end: "top 2%",
      scrub: true,
    },
  });
  tl.to("#nav svg", {
    fill: "white",
    color: "white",
  },"a").to("#nav", {
    background: `linear-gradient(
      to bottom, #f8f0eb31,transparent )`,
  },"a")
  .to(".music-bar",{
    backgroundColor:"white",
  },"a").to("#navRight span",{
    color:"white"
  },"a")
  gsap.from(".page4-heading",{
    transform:"translateY(100%)",
    opacity:0,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4",
      start: "top 50%",
      end:"top 0",
      scrub:true
    },
  })
}

function page5Anime() {
  gsap.set(".elem1 h1, .elem1 p", {
    opacity: 1,
    scale: 1,
  });
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "#main",
      pin: true,
      scrub: 1,
      start: "top 0%",
      end: "top -100%",
    },
  });
  tl.to(
    ".fingerImg",
    {
      y: 240,
    },
    "x"
  )
    .to(
      ".elem1 h1",
      {
        opacity: 0.5,
      },
      "x"
    )
    .to(
      ".elem1 p",
      {
        opacity: 0,
      },
      "x"
    )
    .to(
      ".elem2 h1",
      {
        opacity: 1,
      },
      "x"
    )
    .to(
      ".elem2 p",
      {
        opacity: 1,
      },
      "x"
    );
  tl.to(
    ".fingerImg",
    {
      y: 480,
    },
    "y"
  )
    .to(
      ".elem2 h1",
      {
        opacity: 0.5,
      },
      "y"
    )
    .to(
      ".elem2 p",
      {
        opacity: 0,
      },
      "y"
    )
    .to(
      ".elem3 h1",
      {
        opacity: 1,
      },
      "y"
    )
    .to(
      ".elem3 p",
      {
        opacity: 1,
      },
      "y"
    );
}





function page7Anime() {
  var tl2 = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page7",
      start: "top 0%",
      end: "top -300%",
      pin: true,
      scrub: 0.5,
    },
  });

  tl2
    .to("#page7Pt1>h1>span,#navLeft svg , #navRight svg , #navRight span", {
      color: "black",
      fill: "black",
      stagger: 0.3,
    })
    .to("#page7Pt1,#page7Pt2", {
      transform: "translateX(-100vw)",
      duration: 200,
    })
    .from(
      ".I7img1",
      {
        top: "10%",
        duration: 200,
      },
      "a"
    )
    .from(
      ".I7img2",
      {
        bottom: "0%",
        duration: 200,
      },
      "a"
    )
    .from(
      ".I7img3 img",
      {
        scale: 0,
        duration: 200,
      },
      "a"
    )
    .from(
      ".I7img img",
      {
        transform: "translate(50%,100%)",
        duration: 200,
      },
      "a"
    )
    .to("#page7Pt2", {
      transform: "translateX(-200vw)",
      duration: 200,
    })
    .from(
      ".I7img5",
      {
        top: "10%",
      },
      "b"
    )
    .from(
      ".I7img5 img",
      {
        transform: "translate(50%,100%)",
        duration: 50,
      },
      "b"
    )
    .to("#page7Pt2", {
      transform: "translateX(-300vw)",
      duration: 200,
    })
    .from(
      ".I7img6",
      {
        top: "10%",
      },
      "c"
    )
    .from(
      ".I7img6 img",
      {
        transform: "translateY(110%)",
        duration: 50,
      },
      "c"
    )
    .from(
      ".I7img7",
      {
        top: "10%",
      },
      "d"
    )
    .from(
      ".I7img7 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "d"
    )
    .to("#page7Pt2", {
      transform: "translateX(-400vw)",
      duration: 200,
    })
    .to("#page7Pt2", {
      transform: "translateX(-500vw)",
      duration: 200,
    })
    .from(
      ".I7img8",
      {
        top: "10%",
      },
      "e"
    )
    .from(
      ".I7img8 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "e"
    )
    .to("#page7Pt2", {
      transform: "translateX(-600vw)",
      duration: 200,
    })
    .from(
      ".I7img9",
      {
        top: "10%",
      },
      "f"
    )
    .from(
      ".I7img9 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "f"
    )
    .from(
      ".I7img10",
      {
        top: "10%",
      },
      "g"
    )
    .from(
      ".I7img10 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "g"
    )
    .from(
      ".I7img11",
      {
        top: "10%",
      },
      "h"
    )
    .from(
      ".I7img11 img",
      {
        transform: "translateY(100%)",
        duration: 50,
      },
      "h"
    )
    .from(
      ".I7img12",
      {
        top: "10%",
      },
      "i"
    )
    .from(
      ".I7img12 img",
      {
        transform: "translateY(110%)",
        duration: 50,
      },
      "i"
    )
    .to("#page7Pt2", {
      transform: "translateX(-630vw)",
      duration: 200,
    });
}


function sliderMouseMove() {
  var elem = document.querySelector(".mySwiper");
  elem.addEventListener("mousemove", function (dets) {
    var top = dets.y - elem.getBoundingClientRect().top;
    gsap.to("#swiperCursor", {
      x: dets.x,
      y: top,
      scale: 1,
      ease: Power3,
    });
  });
  elem.addEventListener("mouseout", function (dets) {
    gsap.to("#swiperCursor", {
      scale: 0,
      ease: Power3,
    });
  });
}



function page10Anime(){
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page10",
      start: "top 20%",
      end: "top 0%",
      scrub: true,
    },
  });
  tl.from("#page10 img",{
    opacity:0,
    scale:0
  })
}


function page11Anime(){
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page11",
      start: "top 100%",
      end: "top 0%",
      scrub: true,
    },
  });
  tl.from("#page11 img",{
    opacity:0,
    scale:0
  })
}


sliderMouseMove();



}


function swiperSlide() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: ".mySwiper",
      start: "top 0%",
      end: "top 2%",
      scrub: true,
    },
  });
  tl.to("#nav svg", {
    fill: "black",
  }).to("#nav", {
    background: `linear-gradient(
      to bottom, #1914054d,transparent )`,
  })
  .to(".music-bar",{
    backgroundColor:"black",
  },"a").to("#navRight span",{
    color:"black"
  },"a")
}


function footerAnime() {
  var tl = gsap.timeline({
    scrollTrigger: {
      scroller: "#main",
      trigger: "#footer",
      start: "top 2%",
      end: "top 0%",
      scrub: true,
    },
  });
  tl.to("#nav", {
    background: `linear-gradient(
      to bottom, #19140581,transparent )`,
  });
}

function music() {
  var musicBar;
  var counter = 0;
  function playAudio() {
    musicBar = setInterval(function () {
      var height = Math.random();
      gsap.to(".music-bar", {
        scale: height,
        stagger: 0.13,
      });
    }, 300);
    counter = 1;
    audio.play();
    console.log(counter);
  }

  function stopAudio() {
    document.querySelectorAll(".music-bar").forEach(function (e) {
      clearInterval(musicBar);
    });
    gsap.to(".music-bar", {
      scale: 0.4,
      stagger: 0.14,
    });
    counter = 0;
    audio.pause();

    console.log(counter);
  }
  document.querySelector(".music-bars").addEventListener("click", function () {
    if (counter == 0) {
      playAudio();
    } else {
      stopAudio();
    }
  });
  playAudio();
}


loco();
locoScroll.stop();
loader();
$('.tlt').textillate({ in: { effect: 'fadeIn' } });
page1Anime();
page2Anime();
printPage3Pt1H1();
page3Anime();
page4Anime();
page5Anime();
page6Anime();
printPage7Pt1H1();
page7Anime();
page8Anime();
swiperSlide();
page10Anime();
page11Anime();
page11Pt();
footerAnime();