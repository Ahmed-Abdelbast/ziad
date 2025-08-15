import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">القرآن الكريم</h3>
            <p className="text-muted-foreground">
              تطبيق القرآن الكريم يتيح لك قراءة وسماع القرآن الكريم بكل سهولة ويسر.
            </p>
          </div>
          <div className="md:col-span-2 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="text-muted-foreground hover:text-primary transition-colors">
                  الآيات المحفوظة
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  عن التطبيق
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
