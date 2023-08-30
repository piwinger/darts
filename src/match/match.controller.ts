import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { AuthGuard } from '@nestjs/passport';
import { NullableType } from 'src/utils/types/nullable.type';
import { Match } from './entities/match.entity';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/utils/decorators/user.decorator';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(+id, updateMatchDto);
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
