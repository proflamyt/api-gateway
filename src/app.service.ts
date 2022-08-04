import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { commentDto } from './dto';

@Injectable()
export class AppService {
  constructor(
    // Comments should be stored in a SQL database. 
        // Comments should be retrieved along with the public IP address of the commenter and the UTC date & time they were stored.
        // 
    @Inject("COMMENT_SERVICE") private readonly clientServiceA: ClientProxy,
    @Inject("BOOK_SERVICE") private readonly clientServiceB: ClientProxy
  ) {}

  getBooks() {
    const pattern = { cmd: "get_books" };
    const payload = {};
    return this.clientServiceB
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message }))
      );

  }

  getCharacters(id:number, query) {
    const pattern = { cmd: "get_characters" };
    const payload = {id:id, ...query};
    return this.clientServiceB
      .send(pattern, payload)
      .pipe(
        map((message: string) => ({ message }))
      );

  }
  
  getComment() {
   
    const pattern = { cmd: "get_comment" };
    const payload = {};
    return this.clientServiceA
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message }))
      );
  }
  
  createComment(dto : commentDto){

    const pattern = {cmd: "post_comment" };
    const payload = {body: dto.body,
    ip: dto.ip }
    
    return this.clientServiceA 
      .send<string> (pattern, payload)
      .pipe(
        map((message: string) => ({ message }))
      )

  }
}
