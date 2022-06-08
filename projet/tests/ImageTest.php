<?php

namespace App\Tests;

use App\Entity\Image;
use DateTime;
use PHPUnit\Framework\TestCase;

class ImageTest extends TestCase
{
    public function testIsTrue(): void
    {
        $image = new Image();
        $startDate = new \DateTime('2022-04-07 00:00:00');
        $endDate = new \DateTime('2022-04-08 00:00:00');

        $image->setTitle('titre')
              ->setFile('images/image.ppm')
              ->setStartDateDisplay($startDate)
              ->setEndDateDisplay($endDate);

        $this->assertTrue($image->getTitle() === 'titre');
        $this->assertTrue($image->getFile() === 'images/image.ppm');
        $this->assertTrue($image->getStartDateDisplay() === $startDate);
        $this->assertTrue($image->getEndDateDisplay() === $endDate);
    }

    public function testIsFalse(): void
    {
        $image = new Image();
        $startDate = new \DateTime('2022-04-07 00:00:00');
        $endDate = new \DateTime('2022-04-08 00:00:00');

        $image->setTitle('titre')
              ->setFile('images/image.ppm')
              ->setStartDateDisplay($startDate)
              ->setEndDateDisplay($endDate);

        $this->assertFalse($image->getTitle() === 'false');
        $this->assertFalse($image->getFile() === 'false');
        $this->assertFalse($image->getStartDateDisplay() === new \DateTime('01:00'));
        $this->assertFalse($image->getEndDateDisplay() === new \DateTime('01:00'));
    }

    public function testIsEmpty(): void
    {
        $image = new Image();

        $this->assertEmpty($image->getTitle());
        $this->assertEmpty($image->getFile());
        $this->assertEmpty($image->getStartDateDisplay());
        $this->assertEmpty($image->getEndDateDisplay());
    }
}
