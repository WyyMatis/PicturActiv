<?php

namespace App\Controller;

use App\Repository\ImageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class IndexController extends AbstractController
{
    #[Route('/index', name: 'index')]
    public function index(): Response
    {
        return $this->render('index/index.html.twig', [

        ]);
    }

    #[Route('/api/images', name: 'get_images', methods: 'GET')]
    public function getImages(ImageRepository $imageRepository, SerializerInterface $serializer): Response
    {
        $imagesFromBD = $imageRepository->findAll();

        $allImages = [];

        foreach ($imagesFromBD as $event)
        {
            $delimiters = [' ', ':', '-'];
            $startDateDisplay = str_replace($delimiters, $delimiters[0], $event->getStartDateDisplay()->format('Y-m-d H:i:s'));
            $endDateDisplay = str_replace($delimiters, $delimiters[0], $event->getEndDateDisplay()->format('Y-m-d H:i:s'));

            $allImages[] = [
                'id' => $event->getId(),
                'title' => $event->getTitle(),
                'file' => $event->getFile(),
                'startDateDisplay' => explode($delimiters[0], $startDateDisplay),
                'endDateDisplay' => explode($delimiters[0], $endDateDisplay)
            ];
        }

        $allImagesJSON = $serializer->serialize($allImages, 'json');

        return new JsonResponse($allImagesJSON, 200, [], true);
    }

}
