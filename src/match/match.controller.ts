import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { PostResult as MatchResult } from './dto/update-match.dto';
import { AuthGuard } from '@nestjs/passport';
import { NullableType } from 'src/utils/types/nullable.type';
import { Match } from './entities/match.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/utils/decorators/user.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Match')
@Controller({
  path: 'match',
  version: '1',
})
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto, @User("id") userId) {
    return this.matchService.create(createMatchDto, userId);
  }

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NullableType<Match>> {
    return this.matchService.findOne(+id);
  }

  @Post(':id/result')
  result(@Param('id') id: string, @Body() updateMatchResultDto: MatchResult, @User("id") userId) {
    return this.matchService.update(+id, updateMatchResultDto, userId);
  }

  @Post(':id/accept')
  acceptMatch(@Param('id') id: string, @User("id") userId) {
    return this.matchService.acceptChallenge(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }

  @Get('player/:userId')
  forPlayer(@Param('userId') userId: number) {
    return this.matchService.getMatchesForPlayer(userId);
  }

  

}
