import {useDispatch , useSelector} from 'react-redux'
import { setUserCradencial } from '../store/authSlice'
import Header from "../components/header/header"
import Hero from "../components/hero/hero"
import Search from "../components/search/search"
import ImageBanner from "../components/banner/imageBanner"
import Banner from "../components/banner/banner"
import Banner2 from "../components/banner/banner2"
import Footer from "../components/footer/footer"
import {useLoaderData} from 'react-router-dom'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'



export default function HomePage(){
  const data = useLoaderData();
  const userData = localStorage.getItem('data');
  const dispatch = useDispatch()
  const state = useSelector(state=>state.auth);
  if(userData!==undefined && userData!==null){
    const {info} = JSON.parse(userData);
    dispatch(setUserCradencial(info));
  }
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(()=>{
    gsap.from('nav',{
      y:-90,
      duration : 1,
      ease : 'circ'
    });
    
    gsap.fromTo('.hero-right',{
      x:300,
      opacity : 0,
      ease : 'circ.in'
    },{
      x:0,
      opacity : 1,
    })
    gsap.fromTo('.right-bottom',{
      y : -60,
      opacity : 0,
    },{
      y: 0,
      duration : 1,
      opacity : 1
    })
    gsap.fromTo('.hero-left',{
      x:-300,
      opacity : 0,
      ease : 'circ.in'
    },{
      x:0,
      opacity : 1,
      stagger : 2,
    })
    gsap.fromTo('.hero-left h1 , .hero-left p',{
      opacity : 0,
    },{
      y:-15,
      opacity : 1,
      stagger : .1,
      ease : 'circ',
      delay : .45,
    })
    gsap.from('.search',{
      opacity : 0,
      y:50,
      duration : 1.5
    })
    gsap.from('.banner-right',{
      opacity : 0,
      scrollTrigger : {
        trigger : '.topimg',
        start : 'top 100%',
        end : 'bottom 90%',
        scrub : true,
        once : true
      }
    })
    gsap.fromTo('.feature *',{
      opacity : 0,
    },{
      opacity : 1,
      stagger : .3,
      ease : 'circ'
    })
    gsap.fromTo('article',{
      opacity : 0,
      scale : 2
    },{
      opacity : 1,
      y:-15,
      duration : 1,
      scale : 1,     
      scrollTrigger : {
        trigger : '.banner-left .banner-right',
        start : 'top 10%',
        end : 'bottom bottom',
        scrub : true,
        once : true
      }, 
      ease : 'circ'
    }),
    gsap.fromTo('.newsletter',{
      opacity : .1,

    },{
      opacity : 1,
      scrollTrigger:{
        trigger : '.news-detaile .news-inputs',
        start : 'top 10%',
        end : 'bottom bottom',
        scrub : true
      },
      ease : 'circ'
    })
  },[]);
  return(
      <>
          <Header/>
          <Hero/>
          <Search/>
          <Banner/>
          <ImageBanner/>
          <Banner2/>
          <Footer/>
      </>
  )
}
