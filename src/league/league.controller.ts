import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { AddPlayerDto } from './dto/add-player.dt';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils/decorators/user.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('League')
@Controller({
  path: 'league',
  version: '1',
})
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.create(createLeagueDto);
  }

  @Get()
  findAll() {
    return this.leagueService.findAll();
  }

  @Get(':id')
 
  findOne(@Param('id') id: string,  @User("id") userId) {
    return this.leagueService.getLadder(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leagueService.update(+id, updateLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueService.remove(+id);
  }

  @Post(':id/player')
  addPlayer(@Param('id') id: number, @Body() addPlayerDto: AddPlayerDto) {
    console.log(id)
    return this.leagueService.addPlayer(id, addPlayerDto)
  }
}
