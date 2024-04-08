import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let mockBookmarkService: Partial<BookmarkService>;

  beforeEach(async () => {
    mockBookmarkService = {
      addBookmark: jest.fn(),
      removeBookmark: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [
        {
          provide: BookmarkService,
          useValue: mockBookmarkService,
        },
      ],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addBookmark', () => {
    it('should call bookmarkService.addBookmark with the correct parameters', async () => {
      const user = { id: 1 };
      const catId = 2;
      await controller.addBookmark(user, catId);

      expect(mockBookmarkService.addBookmark).toHaveBeenCalledWith(user.id, catId);
    });
  });

  describe('removeBookmark', () => {
    it('should call bookmarkService.removeBookmark with the correct parameters', async () => {
      const user = { id: 1 };
      const catId = 2;
      await controller.removeBookmark(user, catId);

      expect(mockBookmarkService.removeBookmark).toHaveBeenCalledWith(user.id, catId);
    });
  });
});
