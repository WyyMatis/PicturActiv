<?php

namespace App\DataFixtures;

use App\Entity\Image;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        //Images
        $piece1 = new Image();
        $piece1->setTitle("Pièce 1");
        $piece1->setFile("images/models/006/model.ppm");
        $piece1->setStartDateDisplay(new \DateTime("2022-04-04 00:00:00"));
        $piece1->setEndDateDisplay(new \DateTime("2022-04-05 00:00:00"));
        $manager->persist($piece1);

        $piece2 = new Image();
        $piece2->setTitle("Pièce 2");
        $piece2->setFile("images/models/001/model.ppm");
        $piece2->setStartDateDisplay(new \DateTime("2022-04-05 00:00:00"));
        $piece2->setEndDateDisplay(new \DateTime("2022-04-06 00:00:00"));
        $manager->persist($piece2);

        $piece3 = new Image();
        $piece3->setTitle("Pièce 3");
        $piece3->setFile("images/models/002/model.ppm");
        $piece3->setStartDateDisplay(new \DateTime("2022-04-06 00:00:00"));
        $piece3->setEndDateDisplay(new \DateTime("2022-04-07 00:00:00"));
        $manager->persist($piece3);

        $piece4 = new Image();
        $piece4->setTitle("Pièce 4");
        $piece4->setFile("images/models/000/model.ppm");
        $piece4->setStartDateDisplay(new \DateTime("2022-04-07 00:00:00"));
        $piece4->setEndDateDisplay(new \DateTime("2022-04-08 00:00:00"));
        $manager->persist($piece4);

        $piece5 = new Image();
        $piece5->setTitle("Pièce 5");
        $piece5->setFile("images/models/004/model.ppm");
        $piece5->setStartDateDisplay(new \DateTime("2022-04-08 00:00:00"));
        $piece5->setEndDateDisplay(new \DateTime("2022-04-09 00:00:00"));
        $manager->persist($piece5);


        $manager->flush();
    }
}
