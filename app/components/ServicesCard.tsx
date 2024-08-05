import React from 'react';
import Image from "next/image";
import { ServiceProps } from "@/types";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Eye, ThumbsUp, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceProps;
}

export const ServicesCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="group relative overflow-hidden h-48 transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0">
        <Image
          src={service.banner}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      <div className="relative h-full flex flex-col justify-between p-4 text-white">
        <div>
          <Badge variant="secondary" className="mb-2 bg-white/20 text-white">{service.category}</Badge>
          <h2 className="text-lg font-bold line-clamp-1 mb-1">{service.title}</h2>
          <p className="text-sm line-clamp-2 text-white/80">{service.description}</p>
        </div>
      </div>
    </Card>
  );
};