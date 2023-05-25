import { NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Repository, DataSource } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';

export class BoardRepository extends Repository<Board> {
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    super(Board, dataSource.manager);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(
        `게시글 id ${id}에 해당하는 게시글을 찾을 수 없습니다.`,
      );
    }
    return found;
  }
}
