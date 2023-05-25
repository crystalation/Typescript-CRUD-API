import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from 'src/boards/board.entity';

//injectable 데코레이터
//해당 클래스가 주입가능한 서비스로 등록되어야 함을 알려준다.
@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  //delete는 없으면 안지우고 있으면 지움, 에러가 안난다.
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `${id}에 해당하는 게시글이 존재하지 않습니다.`,
      );
    }
    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}

// getAllBoards(): Board[] {
//   return this.boards;
// }
// createBoard(createBoardDto: CreateBoardDto) {
//   const { title, description } = createBoardDto;
//   const board: Board = {
//     id: uuid(),
//     title: title,
//     description: description,
//     status: BoardStatus.PUBLIC,
//   };
//   this.boards.push(board);
//   return board;
// }

// getBoardById(id: string): Board {
//   const found = this.boards.find((board) => board.id === id);
//   if (!found) {
//     throw new NotFoundException(`해당 게시글을 찾을 수 없습니다.`);
//   }
//   return found;
// }
// deleteBoard(id: string): void {
//   this.boards = this.boards.filter((board) => board.id! == id);
// }
// updateBoardStatus(id: string, status: BoardStatus): Board {
//   const board = this.getBoardById(id);
//   board.status = status;
//   return board;
// }
