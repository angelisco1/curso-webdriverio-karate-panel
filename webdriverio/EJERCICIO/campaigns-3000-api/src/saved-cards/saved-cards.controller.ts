import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { SavedCardsService } from './saved-cards.service'
import { CreateSavedCardDto } from './dto/create-saved-card.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('api/saved-cards')
@UseGuards(JwtAuthGuard)
export class SavedCardsController {
  constructor(private readonly savedCardsService: SavedCardsService) {}

  @Get()
  findAll(@Request() req) {
    return this.savedCardsService.findByUserId(req.user.id)
  }

  @Post()
  create(@Request() req, @Body() createDto: CreateSavedCardDto) {
    return this.savedCardsService.create(req.user.id, createDto)
  }

  @Patch(':id/default')
  setDefault(@Request() req, @Param('id') id: string) {
    return this.savedCardsService.setDefault(+id, req.user.id)
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.savedCardsService.delete(+id, req.user.id)
  }

  @Get(':id/full')
  getFullCard(@Request() req, @Param('id') id: string) {
    return this.savedCardsService.getFullCard(+id, req.user.id)
  }
}
