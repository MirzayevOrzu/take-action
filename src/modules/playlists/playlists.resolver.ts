import { Args, Query, Resolver } from '@nestjs/graphql';
import { PlaylistsArgs } from './dto/playlists.args';
import { Playlist } from './models/playlist.model';
import { PlaylistsService } from './playlists.service';

@Resolver((of) => Playlist)
export class PlaylistsResolver {
    constructor(private readonly playlistsService: PlaylistsService) {}

    @Query(() => [Playlist])
    playlists(@Args() playlistsArgs: PlaylistsArgs): Promise<Playlist[]> {
        return this.playlistsService.list(playlistsArgs);
    }
}
