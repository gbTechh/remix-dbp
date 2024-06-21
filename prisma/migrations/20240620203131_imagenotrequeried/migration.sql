-- AlterTable
ALTER TABLE `Category` MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `mainImage` VARCHAR(191) NULL,
    MODIFY `secondaryImages` JSON NULL;
