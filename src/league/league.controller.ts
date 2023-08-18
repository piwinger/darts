import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { AddPlayerDto } from './dto/add-player.dt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('League')
@Controller('league')
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
  findOne(@Param('id') id: string) {
    return this.leagueService.findOne(+id);
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
