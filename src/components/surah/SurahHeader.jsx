import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SurahHeader = ({ surah, reciters, selectedReciter, onReciterChange }) => {
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `سورة ${surah.name} - القرآن الكريم`,
        text: `اقرأ سورة ${surah.name} في تطبيق القرآن الكريم`,
        url: window.location.href,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط السورة إلى الحافظة",
      });
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">{surah.name}</h1>
      <p className="text-xl text-muted-foreground mb-4">
        {surah.englishName} • {surah.numberOfAyahs} آية • {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
         <Select value={selectedReciter} onValueChange={onReciterChange}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="اختر القارئ" />
          </SelectTrigger>
          <SelectContent>
            {reciters.map((reciter) => (
              <SelectItem key={reciter.id} value={reciter.id}>
                {reciter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SurahHeader;
  