importScripts('cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('imagineee').then(function(cache) {
     return cache.addAll([
      '',
      'index.html',
      'style.css',,
      'app.js',
      'manifest.json',
      'Favicon/favicon.ico',
      'Favicon/apple-touch-icon.png',
      'Favicon/maskable_icon.png',
      'Favicon/android-chrome-512x512.png',
      'icon/imagineee back.svg',
      'files/wave docs.svg',
      'wave.png',
      'files/icons/add.svg',
        'files/icons/add_img.svg',
        'files/icons/add_vid.svg',
        'files/icons/align_center.svg',
        'files/icons/align_justify.svg',
        'files/icons/align_left.svg',
        'files/icons/align_right.svg',
        'files/icons/at.svg',
        'files/icons/attach_file.svg',
        'files/icons/bold.svg',
        'files/icons/chipset.svg',
        'files/icons/code.svg',
        'files/icons/colour_fill.svg',
        'files/icons/control_sphere.svg',
        'files/icons/copy.svg',
        'files/icons/cut.svg',
        'files/icons/dash.svg',
        'files/icons/developer.svg',
        'files/icons/edit_mode.svg',
        'files/icons/email.svg',
        'files/icons/exit_fullscreen.svg',
        'files/icons/font_size.svg',
        'files/icons/full.svg',
        'files/icons/fullscreen.svg',
        'files/icons/indent.svg',
        'files/icons/italic.svg',
        'files/icons/link.svg',
        'files/icons/new.svg',
        'files/icons/orderd_list.svg',
        'files/icons/outdent.svg',
        'files/icons/paragraph.svg',
        'files/icons/paste.svg',
        'files/icons/read_mode.svg',
        'files/icons/redo.svg',
        'files/icons/save.svg',
        'files/icons/search_img.svg',
        'files/icons/share.svg',
        'files/icons/star.svg',
        'files/icons/sticky_notes.svg',
        'files/icons/strikethrough.svg',
        'files/icons/subscript.svg',
        'files/icons/superscript.svg',
        'files/icons/textarea.svg',
        'files/icons/underline.svg',
        'files/icons/undo.svg',
        'files/icons/unorderd_list.svg',
        'files/icons/upload.svg',
        'files/icons/web_frame.svg',
        'files/icons/youtube.svg'
     ]);
   })
 );
});

if (navigator.onLine == true) {
  caches.open('imagineee').then(function(cache) {
    return cache.addAll([
        '',
        'index.html',
        'style.css',,
        'app.js',
        'manifest.json',
        'Favicon/favicon.ico',
        'Favicon/apple-touch-icon.png',
        'Favicon/maskable_icon.png',
        'Favicon/android-chrome-512x512.png',
        'icon/imagineee back.svg',
        'files/wave docs.svg',
        'wave.png',
        'files/icons/add.svg',
          'files/icons/add_img.svg',
          'files/icons/add_vid.svg',
          'files/icons/align_center.svg',
          'files/icons/align_justify.svg',
          'files/icons/align_left.svg',
          'files/icons/align_right.svg',
          'files/icons/at.svg',
          'files/icons/attach_file.svg',
          'files/icons/bold.svg',
          'files/icons/chipset.svg',
          'files/icons/code.svg',
          'files/icons/colour_fill.svg',
          'files/icons/control_sphere.svg',
          'files/icons/copy.svg',
          'files/icons/cut.svg',
          'files/icons/dash.svg',
          'files/icons/developer.svg',
          'files/icons/edit_mode.svg',
          'files/icons/email.svg',
          'files/icons/exit_fullscreen.svg',
          'files/icons/font_size.svg',
          'files/icons/full.svg',
          'files/icons/fullscreen.svg',
          'files/icons/indent.svg',
          'files/icons/italic.svg',
          'files/icons/link.svg',
          'files/icons/new.svg',
          'files/icons/orderd_list.svg',
          'files/icons/outdent.svg',
          'files/icons/paragraph.svg',
          'files/icons/paste.svg',
          'files/icons/read_mode.svg',
          'files/icons/redo.svg',
          'files/icons/save.svg',
          'files/icons/search_img.svg',
          'files/icons/share.svg',
          'files/icons/star.svg',
          'files/icons/sticky_notes.svg',
          'files/icons/strikethrough.svg',
          'files/icons/subscript.svg',
          'files/icons/superscript.svg',
          'files/icons/textarea.svg',
          'files/icons/underline.svg',
          'files/icons/undo.svg',
          'files/icons/unorderd_list.svg',
          'files/icons/upload.svg',
          'files/icons/web_frame.svg',
          'files/icons/youtube.svg'
    ]);
  })
}

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
        );
    });
