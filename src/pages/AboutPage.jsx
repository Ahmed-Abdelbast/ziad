
import React from 'react';
import { motion } from 'framer-motion';
import { Book, Heart, Info, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">عن التطبيق</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          تطبيق القرآن الكريم لقراءة وسماع القرآن بكل سهولة ويسر
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 text-center"
      >
        <div className="max-w-sm mx-auto bg-card rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
          <div className="p-6">
            <p className="text-lg font-semibold text-primary arabic-text">
              صدقة جارية على روح جدي فايز غيضان الميهوب
            </p>
            <p className="mt-1 text-sm text-muted-foreground">رحمه الله وأسكنه فسيح جناته</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-xl p-6 border shadow-sm"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">نبذة عن التطبيق</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
تطبيق القرآن الكريم هو صدقة جارية عن جدي رحمه الله يهدف إلى تسهيل قراءة وسماع القرآن الكريم في أي وقت وأي مكان. يوفر التطبيق واجهة سهلة الاستخدام وتصميم جميل مما يجعل تجربة استخدامه مريحة ومناسبة   .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-xl p-6 border shadow-sm"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Book className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">المميزات</h2>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              قراءة القرآن الكريم بخط واضح وجميل
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
الاستماع إلى تلاوة القرآن الكريم لأكثر من قارئ
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              إضافة للآيات المحفوظة
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              حفظ آخر موضع قراءة
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-xl p-8 border shadow-sm mb-12"
      >
        
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center justify-center">
        
          <p className="text-xl font-bold">
            رزقنا الله وإياكم الإخلاص والقبول
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
