import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/current-user';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { NewPlaylistInput } from './dto/new-playlist.input';
import { PlaylistsArgs } from './dto/playlists.args';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { Playlist } from './models/playlist.model';
import { PlaylistsService } from './playlists.service';

@Resolver((of) => Playlist)
export class PlaylistsResolver {
    constructor(private readonly playlistsService: PlaylistsService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Playlist])
    playlists(
        @Args() playlistsArgs: PlaylistsArgs,
        @CurrentUser() user,
    ): Promise<Playlist[]> {
        return this.playlistsService.list({
            ...playlistsArgs,
            user_id: user.id,
        });
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Playlist)
    playlist(@Args('id') id: number, @CurrentUser() user) {
        return this.playlistsService.show({ id, user_id: user.id });
    }

    @UsePipes(new ValidationPipe({ groups: ['list'] }))
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Playlist)
    addPlaylist(
        @Args('newPlaylistInput') newPlaylistInput: NewPlaylistInput,
        @CurrentUser() user,
    ) {
        return this.playlistsService.create({
            ...newPlaylistInput,
            user_id: user.id,
        });
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Playlist)
    updatePlaylist(
        @Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput,
        @Args('id') id: number,
        @CurrentUser() user,
    ) {
        return this.playlistsService.update(
            { id, user_id: user.id },
            updatePlaylistInput,
        );
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Playlist)
    deletePlaylist(@Args('id') id: number, @CurrentUser() user) {
        return this.playlistsService.delete({ id, user_id: user.id });
    }
}
