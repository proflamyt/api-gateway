import {  Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { commentDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/books")
  getServiceB(){
    return this.appService.getBooks();
  }

  @Get("/books/:id")
  getServiceBookB(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: { name: string }
  ) {

    return this.appService.getCharacters(id, query);

  }
  
  @Get("/comments")
  getServiceA() {
    return this.appService.getComment();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/comments/create")
  postServiceA(
    @Body() dto: commentDto
  ) {
    return this.appService.createComment(dto);
  }
}
