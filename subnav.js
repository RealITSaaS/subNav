$(function(){
  "use strict";
  if ($('[data-wm-plugin="subnav"]').length) {

    $('head').prepend('<link href="https://github.com/RealITSaaS/subNav/blob/main/subnav.css" rel="stylesheet">');
    
    function SubNavBlock(subNav){
      let thisObj = this;
      thisObj.subNav = $(subNav);
      let mainHeader = $('.header .header-announcement-bar-wrapper')[0],
          linkSetup = $(thisObj.subNav).attr('data-nav-setup'),
          subNavPos = $(thisObj.subNav).attr('data-position'),
          isSticky = $(thisObj.subNav).attr('data-sticky'),
          links = [],
          headerStyles,
          headerPaddingLeft,
          headerPaddingRight,
          headerPaddingTop,
          headerPaddingBottom,
          mainHeaderHeight,
          subHeaderHeight,
          announcementBarHeight,
          linkSpacing,
          scrollPos,
          downArrowSvg,
          dropdownNav,
          currentUrl = window.location.pathname;
      console.log(currentUrl);

      if ( isSticky === "true") {
        $('body').addClass('tweak-sticky-subnav');
      }
      
      downArrowSvg = '<div class="secondary-nav-dropdown-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Angle Down</title><desc>A line styled icon from Orion Icon Library.</desc><path data-name="layer1"fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M20 26l11.994 14L44 26"stroke-linejoin="round" stroke-linecap="round"></path></svg></div>';
      
      /*Add Classes & Ids*/
      $('body').addClass('wm-subnav-active');
      $(thisObj.subNav).addClass('cloned-subnav');
      $(thisObj.subNav).wrapInner('<nav class="header-nav-wrapper"></nav>');
      
      /*Get Links*/
      if (linkSetup === "simple") {
        /*Simple Nav*/
        $('a[href="/secondary-nav"]').parent().addClass('hide-link');
        links = $('.header-nav-folder-title[href="/secondary-nav"]').first().next();
        $(links).find('.header-nav-folder-item').each(function(){
          let linkUrl = $(this).find('a').attr('href');
          let linkText = $(this).find('a').text();
          let newLink = '<a href="' + linkUrl + '">' + linkText + '</a>';
          $(thisObj.subNav).find('.header-nav-wrapper').append(newLink)
        });
      } else {}
      
      $(thisObj.subNav).find('a').addClass('wm-subnav-item fadeIn');
      $(thisObj.subNav).find('a.wm-subnav-item').wrap('<div class="header-nav-item"></div>');
      $(thisObj.subNav).attr('id', 'wm-subnav');
      
      /*Clone the Nav for Mobile*/
      thisObj.subNavMobile = $(subNav).clone();
      $(thisObj.subNavMobile).attr('id', '');
      $(downArrowSvg).insertAfter($('#wm-subnav a:not(.cta):last').parent());
      
      /*Build Dropdown Nav*/
      dropdownNav = '<div class="secondary-nav-dropdown"></div>';
      $('#wm-subnav').append(dropdownNav);
      $('#wm-subnav .header-nav-wrapper a:not(.cta)').parent().each(function(){
        let clonedLink = $(this).clone();
        $('.secondary-nav-dropdown').append(clonedLink);
      })
      

      /*Build Mobile Subnav*/
      $(thisObj.subNavMobile).insertAfter($('.header-menu-nav .header-menu-nav-item:last-of-type').first());
      $(thisObj.subNavMobile).addClass('mobile-subnav');
      $('.secondary-nav-dropdown-icon').on('click', function(){
        if($('.secondary-nav-dropdown.open-dropdown').length){
          closeSecondaryNavDropdown();
        } else {
          openSecondaryNavDropdown()
        }
      }) 
      function closeSecondaryNavDropdown(){
        $('.secondary-nav-dropdown').removeClass('open-dropdown');
        $('.secondary-nav-dropdown-icon').removeClass('opened');        
      }
      function openSecondaryNavDropdown(){
        $('.secondary-nav-dropdown').addClass('open-dropdown'); 
        $('.secondary-nav-dropdown-icon').addClass('opened');
      }

      /*Subnav Positioning Options*/
      // Above Header
      if (subNavPos === "top-right"){
        $('#header .header-announcement-bar-wrapper').prepend($(thisObj.subNav));
        $(thisObj.subNav).find('.header-nav-wrapper').css({'justify-content' : 'flex-end'});
        $('body').addClass('tweak-subnav-position-top');

      } else if (subNavPos === "top-center"){
        $('#header .header-announcement-bar-wrapper').prepend($(thisObj.subNav));  
        $(thisObj.subNav).find('.header-nav-wrapper').css({'justify-content' : 'center'});     
        $('body').addClass('tweak-subnav-position-top');

      } else if (subNavPos === "top-left"){
        $('#header .header-announcement-bar-wrapper').prepend($(thisObj.subNav));
        $(thisObj.subNav).find('.header-nav-wrapper').css({'justify-content' : 'flex-start'}); 
        $('body').addClass('tweak-subnav-position-top');

        // On Center
      } else if (subNavPos === "center-right"){
        $(thisObj.subNav).insertAfter($('.header-announcement-bar-wrapper .header-inner .header-display-desktop .header-title'));
        $('body').addClass('tweak-subnav-position-center-right');

      }else if (subNavPos === "center-left"){
        $(thisObj.subNav).insertAfter($('.header-announcement-bar-wrapper .header-inner .header-display-desktop .header-title'));
        $('body').addClass('tweak-subnav-position-center-left');

        // On Bottom
      } else if (subNavPos === "bottom-center"){
        $('#header .header-announcement-bar-wrapper').append($(thisObj.subNav));
        $(thisObj.subNav).find('.header-nav-wrapper').css({'justify-content' : 'center'}); 
        $('body').addClass('tweak-subnav-position-bottom');

      } else if (subNavPos === "bottom-right"){
        $('#header .header-announcement-bar-wrapper').append($(thisObj.subNav));
        $(thisObj.subNav).find('.header-nav-wrapper').css({'justify-content' : 'flex-end'}); 
        $('body').addClass('tweak-subnav-position-bottom');

      } else if (subNavPos === "bottom-left"){
        $('#header .header-announcement-bar-wrapper').append($(thisObj.subNav));
        $(thisObj.subNav).find('.header-nav-wrapper').css({'justify-content' : 'flex-start'}); 
        $('body').addClass('tweak-subnav-position-bottom');
      }
      
       /*Add Class to Secondary Nav if On Page*/
      $('#wm-subnav a.wm-subnav-item').each(function(){
        if ($(this).attr('href') === currentUrl){
          $(this).closest('.header-nav-item').addClass('header-nav-item--active')
        }
      });

      /*Update Styles on Resize*/
      function resizePadding(){
        headerPaddingLeft = $('#header .header-announcement-bar-wrapper').css('padding-left');
        headerPaddingRight = $('#header .header-announcement-bar-wrapper').css('padding-right');
        headerPaddingTop = $('#header .header-announcement-bar-wrapper').css('padding-top');
        headerPaddingBottom = $('#header .header-announcement-bar-wrapper').css('padding-bottom');
        mainHeaderHeight = $('#header .header-inner').outerHeight();
        subHeaderHeight = $('#wm-subnav').outerHeight();
        announcementBarHeight = $('.sqs-announcement-bar-dropzone').outerHeight();
        $(':root').css('--headerPaddingLeft', headerPaddingLeft);
        $(':root').css('--headerPaddingRight', headerPaddingRight); 
        $(':root').css('--headerPaddingTop', headerPaddingTop);
        $(':root').css('--headerPaddingBottom', headerPaddingBottom);
        $(':root').css('--wmHeaderHeight', mainHeaderHeight + "px");
        $(':root').css('--wmSubNavHeight', subHeaderHeight + "px");
        $(':root').css('--announcementBarHeight', announcementBarHeight + "px" );
      }
      window.addEventListener('resize', function(){
        closeSecondaryNavDropdown();
        setTimeout(function(){
          resizePadding();
        }, 150);
      });
      window.addEventListener('scroll', function(){
        setTimeout(function(){
          window.dispatchEvent(new Event('resize'));
        }, 150);
      })
      
      window.dispatchEvent(new Event('resize'));
      $('#wm-subnav').addClass('secondary-nav-loaded');
    }

    let subNav = $('[data-wm-plugin="subnav"]').first();
    $(subNav).css({'display': 'none'})
    new SubNavBlock(subNav);
  }
});
