import sql from './db';

export async function seedDatabase() {
  try {
    console.log('Seeding database...');

    // Check if data already exists to avoid duplicates
    const existingRestaurants = await sql`SELECT COUNT(*) FROM restaurants`;
    if (parseInt(existingRestaurants[0].count) > 0) {
      console.log('Database already seeded');
      return;
    }

    // Insert restaurants
    await sql`
      INSERT INTO restaurants 
        (name, logo, cover_image, rating, delivery_time, delivery_fee, minimum_order, description, location)
      VALUES 
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Ile Iyan bodija', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2File_iyan.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fpounded%20yam_640x280_6aSzK9fvkyTLWADmf0K9V.jpg?alt=media&token=919252cb-e8ab-4851-886b-b2b970166af2', 4.4, 'Closes at 01:00 PM', '₦750 off delivery', '₦1,200', 'Goat meat, Soup bowl', 'Ibadan'),
        
        ('MunchLunch Cafe', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fmunchlunch.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2FIMG_5345_500x219_Ak6GKm3RHv44V_MPej9iF_488x213_sHTOOYxUXd_L7LAZP5jcx.jpg?alt=media&token=b7fc8305-fcc8-476b-bd16-78b4b87d13c8', 3.4, 'Closes at 01:00 PM', '5% off order', '₦1,000', 'Chicken, Fastfood, Rice', 'Lagos'),
        
        ('Jollof Square Sango', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_logos%2Fjollof_square.png?alt=media', 'https://firebasestorage.googleapis.com/v0/b/heyfood-558b4.appspot.com/o/vendor_images%2Fmaxresdefault%20(4)_1280x559_ZR-__-c1hiaSZNvsP4646.jpg?alt=media&token=b39cdcca-7137-4a02-9b6b-3b165a45fc59', 4.5, 'Closes at 01:00 PM', '10% off order', '₦1,500', 'Chicken, Fastfood, Rice', 'Lagos')
    `;

    // Insert tags
    await sql`
      INSERT INTO tags (name)
      VALUES 
        ('Chicken'),
        ('Fast Food'),
        ('Rice'),
        ('Fastfood'),
        ('Goat meat'),
        ('Soup bowl'),
        ('Nigerian'),
        ('African'),
        ('Pasta'),
        ('Seafood'),
        ('Burgers')
    `;

    // Get inserted restaurants and tags for reference
    const restaurants = await sql`SELECT id, name FROM restaurants`;
    const tags = await sql`SELECT id, name FROM tags`;

    // Create mapping for easier reference
    const restaurantMap = restaurants.reduce((map, restaurant) => {
      map[restaurant.name] = restaurant.id;
      return map;
    }, {});

    const tagMap = tags.reduce((map, tag) => {
      map[tag.name] = tag.id;
      return map;
    }, {});

    // Associate restaurants with tags
    await sql`
      INSERT INTO restaurant_tags (restaurant_id, tag_id)
      VALUES 
        (${restaurantMap['Jollof Square Sango']}, ${tagMap['Chicken']}),
        (${restaurantMap['Jollof Square Sango']}, ${tagMap['Fastfood']}),
        (${restaurantMap['Jollof Square Sango']}, ${tagMap['Rice']}),
        
        (${restaurantMap['Ile Iyan bodija']}, ${tagMap['Goat meat']}),
        (${restaurantMap['Ile Iyan bodija']}, ${tagMap['Soup bowl']}),
        (${restaurantMap['Ile Iyan bodija']}, ${tagMap['Nigerian']}),
        
        (${restaurantMap['MunchLunch Cafe']}, ${tagMap['Chicken']}),
        (${restaurantMap['MunchLunch Cafe']}, ${tagMap['Fastfood']}),
        (${restaurantMap['MunchLunch Cafe']}, ${tagMap['Rice']})
    `;

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}