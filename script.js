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
        i = playPauseButton.find('i');
    
        var currentSong = 0;

    var songs = [
        {
            artist: 'The Paper Kites',
            author: 'The Paper Kites',
            title: 'Bloom',
            url: './music/Bloom - The Paper Kites (Nhac.Pro.Vn).mp3',
            picture: './amy-humphries-8I8G_Rw9lRw-unsplash.jpg',
            year: '2015',
            duration: '22:00'
        }
    ];

    window.onload = playSong();

    function playSong(){
        song.src = songs[currentSong].url;

        trackName.text(songs[currentSong].title);
        trackSinger.text(songs[currentSong].artist);
        trackAuthor.text(songs[currentSong].author);
        trackYear.text(songs[currentSong].year);
        $('#bg-artwork').css("background-image", 'url(' + songs[currentSong].picture + ')');
        
        song.play();
    }
    
    // function playPauseSong(){
    //     if(song.paused){
    //         song.play();
    //         i.attr("class", "fas fa-pause");
    //     }
    //     else{
    //         song.pause();
    //         i.attr("class", "fas fa-play");
    //     }
    // }
    
    function playPause()
    {
        setTimeout(function()
        {
            if(song.paused)
            {
                // playerTrack.addClass('active');
                // albumArt.addClass('active');
                // checkBuffering();
                i.attr("class", "fas fa-pause");
                song.play();

            }
            else
            {
                // playerTrack.removeClass('active');
                // albumArt.removeClass('active');
                // clearInterval(buffInterval);
                // albumArt.removeClass('buffering');
                i.attr("class", "fas fa-play");
                song.pause();
                
            }
        },300);
        
    }

    playPauseButton.on('click', playPause);

    
}); 

    

