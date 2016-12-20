// jQuery Selections
var $html = $('html'),
    $container = $('#container'),
    $prompt = $('#prompt'),
    $toggle = $('#toggle'),
    $about = $('#about'),
    $scene = $('#scene');

// Hide browser menu.
(function() {
  setTimeout(function(){window.scrollTo(0,0);},0);
})();

// Setup FastClick.
FastClick.attach(document.body);

// Add touch functionality.
if (Hammer.HAS_TOUCHEVENTS) {
  $container.hammer({drag_lock_to_axis: true});
  _.tap($html, 'a,button,[data-tap]');
}

// Add touch or mouse class to html element.
$html.addClass(Hammer.HAS_TOUCHEVENTS ? 'touch' : 'mouse');

// Resize handler.
(resize = function() {
  $scene[0].style.width = window.innerWidth + 'px';
  $scene[0].style.height = window.innerHeight + 'px';
  if (!$prompt.hasClass('hide')) {
    if (window.innerWidth < 600) {
      $toggle.addClass('hide');
    } else {
      $toggle.removeClass('hide');
    }
  }
})();

// Attach window listeners.
window.onresize = _.debounce(resize, 200);
window.onscroll = _.debounce(resize, 200);

function showDetails() {
  $about.removeClass('hide');
  $toggle.removeClass('i');
}

function hideDetails() {
  $about.addClass('hide');
  $toggle.addClass('i');
}

// Listen for toggle click event.
$toggle.on('click', function(event) {
  $toggle.hasClass('i') ? showDetails() : hideDetails();
});

// Pretty simple huh?
$scene.parallax();

// Check for orientation support.
setTimeout(function() {
  if ($scene.data('mode') === 'cursor') {
    $prompt.removeClass('hide');
    if (window.innerWidth < 600) $toggle.addClass('hide');
    $prompt.on('click', function(event) {
      $prompt.addClass('hide');
      if (window.innerWidth < 600) {
        setTimeout(function() {
          $toggle.removeClass('hide');
        },1200);
      }
    });
  }
},1000);

// Twitter stuff.
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

// Facebook stuff.
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=709933052350821";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
