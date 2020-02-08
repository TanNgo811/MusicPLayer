$(function(){

    var song = new Audio();

    var playerTrack = $('#player-track');

    var bgArtWorkUrl;
    var trackName = $('#track-name'),
        trackSinger = $('#track-singer'),
        trackAuthor = $('#track-author'),
        trackYear = $('#track-year'),
        trackLength = $('#track-length'),
        trackPoster = $('#bg-artwork');

    var playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        playPreviousTrackButton = $('#play-previous'),
        playNextTrackButton = $('#play-next'),
        currIndex = -1;
    
        // var currentSong = 0;

    var songs = [
        {
            artist: 'The Paper Kites',
            author: 'The Paper Kites',
            title: 'Bloom',
            url: './music/Bloom - The Paper Kites (Nhac.Pro.Vn).mp3',
            picture: './amy-humphries-8I8G_Rw9lRw-unsplash.jpg',
            year: '2015',
            duration: '22:00'
        },
        {
            artist: 'Keira Knightley',
            author: 'Keira Knightley',
            title: 'Coming Up Roses',
            url: './music/Coming_Up_Roses_-_Keira_Knightley_MP3_320kbps_-1.mp3',
            picture: './nikita-tikhomirov-dv7cSiHurKM-unsplash.jpg',
            year: '2017',
            duration: '22:00'
        }
    ];

    function shuffle(a) {
		var j, x;
		for (var i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	songs = shuffle(songs);

    // window.onload = playSong();

    // function playSong(){
    //     song.src = songs[currentSong].url;

    //     trackName.text(songs[currentSong].title);
    //     trackSinger.text(songs[currentSong].artist);
    //     trackAuthor.text(songs[currentSong].author);
    //     trackYear.text(songs[currentSong].year);
    //     $('#bg-artwork').css("background-image", 'url(' + songs[currentSong].picture + ')');
        
    //     song.play();
    // }
    
    function playPause(){
        if(song.paused){
            song.play();
            i.attr("class", "fas fa-pause");
        }
        else{
            song.pause();
            i.attr("class", "fas fa-play");
        }
    }
    
    // function playPause()
    // {
    //     setTimeout(function()
    //     {
    //         if(song.paused)
    //         {
    //             // playerTrack.addClass('active');
    //             // albumArt.addClass('active');
    //             // checkBuffering();
    //             i.attr("class", "fas fa-pause");
    //             song.play();

    //         }
    //         else
    //         {
    //             // playerTrack.removeClass('active');
    //             // albumArt.removeClass('active');
    //             // clearInterval(buffInterval);
    //             // albumArt.removeClass('buffering');
    //             i.attr("class", "fas fa-play");
    //             song.pause();
                
    //         }
    //     },300);
        
    // }

    // playPauseButton.on('click', playPause);

   function selectTrack(flag){
       if(flag == 0 || flag == 1)
       {
            ++currIndex;
       }
       else
       {
           --currIndex;
       }

       if ( (currIndex > -1) && (currIndex < songs.length) )
       {
           if(flag == 0)
           {
                i.attr("class", "fas fa-play");
           }
           else
           {
                i.attr("class", "fas fa-pause");
           }

            song.src = songs[currentSong].url;

            trackName.text(songs[currentSong].title);
            trackSinger.text(songs[currentSong].artist);
            trackAuthor.text(songs[currentSong].author);
            trackYear.text(songs[currentSong].year);
            $('#bg-artwork').css("background-image", 'url(' + songs[currentSong].picture + ')');

            if (flag != 0)
            {
                song.play();



            }
   
       }
       else
       {
           if (flag == 0 || flag == 1){
                --currIndex;
           }
           else{
                ++currIndex;
           }
       }
   }

   function initPlayer()
   {
        

        selectTrack(0);

        song.loop = false;

        playPauseButton.on('click', playPause);

        playNextTrackButton.on("click", function(){
            selectTrack(1);
        });

        playPreviousTrackButton.on("click", function(){
            selectTrack(-1);
        });
   }

   initPlayer();
}); 

    

