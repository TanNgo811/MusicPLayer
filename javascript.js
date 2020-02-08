$(function(){

    var audio = new Audio();

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
    
    var sArea = $('#s-area'), seekBar = $('#seek-bar'), trackTime = $('#track-time'), insTime = $('#ins-time'),
    sHover = $('#s-hover'), tProgress = $('#current-time'), tTime = $('#track-length'),
    seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds,
    playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false;


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
        },
        {
            artist: 'Taylor Swift',
            author: 'Taylor Swift',
            title: 'Back To December',
            url: './music/Back To December (US Version)_Taylor Swift_-1364616.mp3',
            picture: './lochlainn-riordan-G6CR8v_bts0-unsplash.jpg',
            year: '2020',
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
    
    
    
    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                // playerTrack.addClass('active');
                // albumArt.addClass('active');
                // checkBuffering();
                i.attr("class", "fas fa-pause");
                audio.play();

            }
            else
            {
                // playerTrack.removeClass('active');
                // albumArt.removeClass('active');
                // clearInterval(buffInterval);
                // albumArt.removeClass('buffering');
                i.attr("class", "fas fa-play");
                audio.pause();
                
            }
        },300);
        
    }
    
    function showHover(event){
        seekBarPos = sArea.offset();
        seekT = event.clientX -seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60; // Tinh thoi gian hien tren thanh thoi gian

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
        
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
            insTime.text(ctMinutes+':'+ctSeconds);
            
        insTime.css({'left':seekT,'margin-left':'-10px'}).fadeIn(0);

    }

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }

    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime(){
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            
			selectTrack(1);
		}
    }
    // playPauseButton.on('click', playPause);
    
    // function playNext(){
    //     ++currIndex;
    //     if (currIndex > songs.length - 1){
    //         currIndex = 0;
    //     }
    //     playSong(currIndex);
    // }

    // playNextTrackButton.on('click', playNext);

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                
                i.attr('class','fa fa-pause');
            }
            seekBar.width(0);
			
            audio.src = songs[currIndex].url;

            trackName.text(songs[currIndex].title);
            trackSinger.text(songs[currIndex].artist);
            trackAuthor.text(songs[currIndex].author);
            trackYear.text(songs[currIndex].year);
            $('#bg-artwork').css("background-image", 'url(' + songs[currIndex].picture + ')');
                

            if(flag != 0)
            {
                audio.play();
            }

        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{	

		selectTrack(0);
		
		audio.loop = false;
		
		playPauseButton.on('click',playPause);
        sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        sArea.on('click',playFromClickedPos);
        $(audio).on('timeupdate',updateCurrTime);


        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}
    
	initPlayer();
}); 

    

