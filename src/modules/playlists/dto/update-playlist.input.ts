import { InputType, PartialType } from '@nestjs/graphql';
import { NewPlaylistInput } from './new-playlist.input';

@InputType()
export class UpdatePlaylistInput extends PartialType(NewPlaylistInput) {}
