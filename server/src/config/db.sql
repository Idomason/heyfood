-- Drop tables if they exist
DROP TABLE IF EXISTS restaurant_tags;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS tags;

-- Create restaurants table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    cover_image VARCHAR(255) NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    delivery_time VARCHAR(50) NOT NULL,
    delivery_fee VARCHAR(50) NOT NULL,
    minimum_order VARCHAR(50) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL
);

-- Create tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Create restaurant_tags junction table
CREATE TABLE restaurant_tags (
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (restaurant_id, tag_id)
);

-- Insert sample data
INSERT INTO restaurants (name, logo, cover_image, rating, delivery_time, delivery_fee, minimum_order, description, location)
VALUES 
    ('Chicken Republic', 'https://heyfood.africa/images/chicken-republic-logo.png', 'https://heyfood.africa/images/chicken-republic-cover.jpg', 4.5, '30-45 min', '₦700', '₦1,500', 'Fast food restaurant chain', 'Lagos'),
    ('Dominos Pizza', 'https://heyfood.africa/images/dominos-logo.png', 'https://heyfood.africa/images/dominos-cover.jpg', 4.7, '25-40 min', '₦800', '₦2,000', 'Pizza delivery', 'Lagos'),
    ('KFC', 'https://heyfood.africa/images/kfc-logo.png', 'https://heyfood.africa/images/kfc-cover.jpg', 4.3, '35-50 min', '₦750', '₦1,800', 'Kentucky Fried Chicken', 'Lagos'),
    ('Sweet Sensation', 'https://heyfood.africa/images/sweet-sensation-logo.png', 'https://heyfood.africa/images/sweet-sensation-cover.jpg', 4.0, '40-55 min', '₦650', '₦1,700', 'Nigerian fast food chain', 'Lagos'),
    ('Kilimanjaro', 'https://heyfood.africa/images/kilimanjaro-logo.png', 'https://heyfood.africa/images/kilimanjaro-cover.jpg', 4.2, '30-50 min', '₦700', '₦1,500', 'Nigerian restaurant chain', 'Lagos');

-- Insert tags
INSERT INTO tags (name) VALUES 
    ('Chicken'),
    ('Pizza'),
    ('Fast Food'),
    ('Nigerian'),
    ('Rice'),
    ('Burgers'),
    ('Chinese'),
    ('African'),
    ('Pasta'),
    ('Seafood');

-- Associate restaurants with tags
-- Chicken Republic
INSERT INTO restaurant_tags VALUES (1, 1), (1, 3), (1, 5), (1, 6);
-- Dominos
INSERT INTO restaurant_tags VALUES (2, 2), (2, 3), (2, 9);
-- KFC
INSERT INTO restaurant_tags VALUES (3, 1), (3, 3), (3, 6);
-- Sweet Sensation
INSERT INTO restaurant_tags VALUES (4, 1), (4, 3), (4, 4), (4, 5), (4, 8);
-- Kilimanjaro
INSERT INTO restaurant_tags VALUES (5, 1), (5, 3), (5, 4), (5, 5), (5, 8); 