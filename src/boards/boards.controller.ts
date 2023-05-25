import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

//localhost:3000/boards<<경로주소
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // //getAllBoard()라는 메서드 = BoardsController에서 /boards경로의 GET 요청을 핸들링하는 핸들러
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
