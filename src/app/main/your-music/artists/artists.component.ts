import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/services/spotify-services';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {NavigationService} from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artists: any;
  options: any;
  type: string = 'artist';

  constructor(public spotifyService: SpotifyService,
              public router: Router,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.spotifyService.getFollowedArtists(this.type).subscribe(
      data => {
        this.artists = data.artists;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToArtist(artist) {
    this.navigationService.goToArtist(artist);
  };

  loadMoreArtists() {
    this.options = {
      limit: 20,
      after: this.artists.cursors.after
    };
    this.spotifyService.getFollowedArtists(this.type, this.options).subscribe(
      data => {
        this.artists.items = this.artists.items.concat(data.artists.items);
        document.getElementById('loadMoreArtists').blur();
      },
      error => {
        console.log(error);
      }
    );
  };

}
