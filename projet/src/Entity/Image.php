<?php

namespace App\Entity;

use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[ORM\Column(type: 'string', length: 255)]
    private $file;

    #[ORM\Column(type: 'datetime')]
    private $startDateDisplay;

    #[ORM\Column(type: 'datetime')]
    private $endDateDisplay;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getFile(): ?string
    {
        return $this->file;
    }

    public function setFile(string $file): self
    {
        $this->file = $file;

        return $this;
    }

    public function getStartDateDisplay(): ?\DateTimeInterface
    {
        return $this->startDateDisplay;
    }

    public function setStartDateDisplay(\DateTimeInterface $startDateDisplay): self
    {
        $this->startDateDisplay = $startDateDisplay;

        return $this;
    }

    public function getEndDateDisplay(): ?\DateTimeInterface
    {
        return $this->endDateDisplay;
    }

    public function setEndDateDisplay(\DateTimeInterface $endDateDisplay): self
    {
        $this->endDateDisplay = $endDateDisplay;

        return $this;
    }
}
