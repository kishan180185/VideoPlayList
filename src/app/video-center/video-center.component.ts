import { VideoService } from './../video.service';
import { Video } from './../video';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers:[VideoService]

})
export class VideoCenterComponent implements OnInit {

  videos :Array <Video>;
selectedVideo:Video;
private hidenewVideo: boolean= true;
  constructor(private _videoService:VideoService) { }

  ngOnInit() {
    this._videoService.getVideos().subscribe(resVideoData=> this.videos=resVideoData)
  }
onselect(video:any){
  this.selectedVideo= video;
  this.hidenewVideo = true;
  console.log(this.selectedVideo);
}
onsubmitAddVideo(video:Video){
  this._videoService.addvideo(video).subscribe
  (resNewVideo=>{
    this.videos.push(resNewVideo);
    this.hidenewVideo = true;
    this.selectedVideo=resNewVideo;
  })
}
newVideo(){
  this.hidenewVideo= false;
}
onupdateVideoEvent(video:any){
  this._videoService.updatevideo(video)
  .subscribe(resUpdatedVideo => video=resUpdatedVideo)
  this.selectedVideo = null;
}
onDeleteVideoEvent(video:any){
  let videoArray= this.videos;
  this._videoService.deleteVideo(video)
  .subscribe(resDeleteVideo=>{
    for(let i=0;i<videoArray.length;i++){
      if(videoArray[i]._id ===video._id)
        {
          videoArray.splice(i,1)
        }
    }
  })
  this.selectedVideo=null;

}
}
