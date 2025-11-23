-- Add 90 More Questions to EduFlash
-- Copy and paste this entire file into Supabase SQL Editor and click "Run"

-- ============================================
-- GENERAL KNOWLEDGE QUESTIONS (30)
-- ============================================

INSERT INTO questions (topic, question, options, correct_answer, explanation) VALUES

-- Geography & World
('general', 'What is the largest ocean on Earth?', '["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"]', 1, 'The Pacific Ocean is the largest ocean, covering approximately 165 million square kilometers.'),
('general', 'Which country has the most natural lakes?', '["USA", "Canada", "Russia", "Finland"]', 1, 'Canada has more lakes than any other country, with over 2 million lakes.'),
('general', 'What is the capital of Australia?', '["Sydney", "Melbourne", "Canberra", "Brisbane"]', 2, 'Canberra is the capital city of Australia, located between Sydney and Melbourne.'),
('general', 'Which river is the longest in the world?', '["Amazon", "Nile", "Yangtze", "Mississippi"]', 1, 'The Nile River is approximately 6,650 km long, making it the longest river in the world.'),
('general', 'Mount Everest is located in which mountain range?', '["Andes", "Rockies", "Himalayas", "Alps"]', 2, 'Mount Everest is part of the Himalayan mountain range on the border of Nepal and Tibet.'),

-- History & Culture
('general', 'Who painted the Mona Lisa?', '["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"]', 1, 'Leonardo da Vinci painted the Mona Lisa in the early 16th century.'),
('general', 'In which year did World War II end?', '["1943", "1944", "1945", "1946"]', 2, 'World War II ended in 1945 with the surrender of Japan in September.'),
('general', 'Who was the first person to walk on the moon?', '["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"]', 1, 'Neil Armstrong was the first person to walk on the moon on July 20, 1969.'),
('general', 'Which ancient wonder is still standing today?', '["Colossus of Rhodes", "Hanging Gardens", "Great Pyramid of Giza", "Lighthouse of Alexandria"]', 2, 'The Great Pyramid of Giza is the only ancient wonder still standing today.'),
('general', 'Who wrote "Romeo and Juliet"?', '["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"]', 1, 'William Shakespeare wrote Romeo and Juliet around 1594-1596.'),

-- Science & Technology
('general', 'What does DNA stand for?', '["Deoxyribonucleic Acid", "Digital Network Access", "Dynamic Nuclear Assembly", "Data Nucleotide Array"]', 0, 'DNA stands for Deoxyribonucleic Acid, which carries genetic information.'),
('general', 'Who invented the telephone?', '["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"]', 1, 'Alexander Graham Bell is credited with inventing the telephone in 1876.'),
('general', 'What is the speed of light?', '["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"]', 0, 'Light travels at approximately 300,000 kilometers per second in a vacuum.'),
('general', 'Which planet is known as the Red Planet?', '["Venus", "Jupiter", "Mars", "Saturn"]', 2, 'Mars is called the Red Planet due to iron oxide (rust) on its surface.'),
('general', 'How many bones are in the adult human body?', '["186", "206", "226", "246"]', 1, 'An adult human body has 206 bones.'),

-- Sports & Entertainment
('general', 'How many players are on a soccer team?', '["9", "10", "11", "12"]', 2, 'A soccer team has 11 players on the field, including the goalkeeper.'),
('general', 'Which country won the first FIFA World Cup?', '["Brazil", "Argentina", "Uruguay", "Italy"]', 2, 'Uruguay won the first FIFA World Cup in 1930.'),
('general', 'In which year were the first modern Olympics held?', '["1886", "1896", "1906", "1916"]', 1, 'The first modern Olympic Games were held in Athens, Greece in 1896.'),
('general', 'How many strings does a standard guitar have?', '["4", "5", "6", "7"]', 2, 'A standard guitar has 6 strings.'),
('general', 'Which movie won the first Academy Award for Best Picture?', '["Wings", "The Jazz Singer", "Sunrise", "Metropolis"]', 0, 'Wings won the first Academy Award for Best Picture in 1929.'),

-- Miscellaneous
('general', 'What is the smallest country in the world?', '["Monaco", "Liechtenstein", "Vatican City", "San Marino"]', 2, 'Vatican City is the smallest country with an area of about 0.44 square kilometers.'),
('general', 'Which element has the chemical symbol "Au"?', '["Silver", "Aluminum", "Gold", "Argon"]', 2, 'Au is the chemical symbol for gold, from the Latin word "aurum".'),
('general', 'How many days are in a leap year?', '["364", "365", "366", "367"]', 2, 'A leap year has 366 days, with February having 29 days instead of 28.'),
('general', 'What is the largest mammal in the world?', '["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"]', 1, 'The blue whale is the largest mammal, reaching lengths of up to 30 meters.'),
('general', 'Which language has the most native speakers?', '["English", "Mandarin Chinese", "Spanish", "Hindi"]', 1, 'Mandarin Chinese has the most native speakers with over 900 million.'),
('general', 'What is the hardest natural substance on Earth?', '["Gold", "Iron", "Diamond", "Titanium"]', 2, 'Diamond is the hardest natural substance, rating 10 on the Mohs scale.'),
('general', 'How many continents are there?', '["5", "6", "7", "8"]', 2, 'There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Oceania, and South America.'),
('general', 'What is the tallest building in the world (as of 2024)?', '["Shanghai Tower", "Burj Khalifa", "Merdeka 118", "Tokyo Skytree"]', 1, 'Burj Khalifa in Dubai stands at 828 meters, making it the tallest building.'),
('general', 'Which artist is famous for cutting off his ear?', '["Pablo Picasso", "Vincent van Gogh", "Salvador Dali", "Claude Monet"]', 1, 'Vincent van Gogh famously cut off part of his left ear in 1888.'),
('general', 'What is the currency of Japan?', '["Won", "Yuan", "Yen", "Ringgit"]', 2, 'The Japanese currency is the Yen (¥).'),
('general', 'How many time zones does Russia have?', '["7", "9", "11", "13"]', 2, 'Russia spans 11 time zones, the most of any country.');

-- ============================================
-- MATH QUESTIONS (30)
-- ============================================

INSERT INTO questions (topic, question, options, correct_answer, explanation) VALUES

-- Basic Arithmetic
('math', 'What is 15 + 27?', '["40", "42", "44", "46"]', 1, 'Addition: 15 + 27 = 42'),
('math', 'What is 144 ÷ 12?', '["10", "11", "12", "13"]', 2, 'Division: 144 ÷ 12 = 12'),
('math', 'What is 8 × 9?', '["64", "72", "81", "88"]', 1, 'Multiplication: 8 × 9 = 72'),
('math', 'What is 100 - 37?', '["61", "63", "65", "67"]', 1, 'Subtraction: 100 - 37 = 63'),
('math', 'What is 25% of 200?', '["25", "40", "50", "75"]', 2, 'Percentage: 25% × 200 = 0.25 × 200 = 50'),

-- Fractions & Decimals
('math', 'What is 1/2 + 1/4?', '["1/2", "2/3", "3/4", "1"]', 2, 'Adding fractions: 1/2 + 1/4 = 2/4 + 1/4 = 3/4'),
('math', 'What is 0.5 × 0.5?', '["0.1", "0.25", "0.5", "1"]', 1, 'Decimal multiplication: 0.5 × 0.5 = 0.25'),
('math', 'Convert 3/5 to a decimal', '["0.4", "0.5", "0.6", "0.7"]', 2, 'Division: 3 ÷ 5 = 0.6'),
('math', 'What is 2/3 of 60?', '["30", "35", "40", "45"]', 2, 'Fraction multiplication: (2/3) × 60 = 40'),
('math', 'Simplify: 8/12', '["1/2", "2/3", "3/4", "4/5"]', 1, 'Dividing by GCD(4): 8/12 = 2/3'),

-- Algebra
('math', 'If x + 5 = 12, what is x?', '["5", "6", "7", "8"]', 2, 'Solving: x = 12 - 5 = 7'),
('math', 'What is 2³ (2 cubed)?', '["4", "6", "8", "16"]', 2, '2³ = 2 × 2 × 2 = 8'),
('math', 'Solve: 3x = 15', '["3", "4", "5", "6"]', 2, 'Dividing both sides by 3: x = 15 ÷ 3 = 5'),
('math', 'What is the square root of 64?', '["6", "7", "8", "9"]', 2, '√64 = 8 because 8 × 8 = 64'),
('math', 'If y = 2x and x = 4, what is y?', '["6", "8", "10", "12"]', 1, 'Substitution: y = 2(4) = 8'),

-- Geometry
('math', 'How many degrees are in a triangle?', '["90°", "180°", "270°", "360°"]', 1, 'The sum of angles in any triangle is always 180°.'),
('math', 'What is the area of a rectangle with length 8 and width 5?', '["26", "30", "35", "40"]', 3, 'Area = length × width = 8 × 5 = 40'),
('math', 'How many sides does a hexagon have?', '["5", "6", "7", "8"]', 1, 'A hexagon has 6 sides.'),
('math', 'What is the perimeter of a square with side length 7?', '["21", "24", "28", "35"]', 2, 'Perimeter = 4 × side = 4 × 7 = 28'),
('math', 'What is the circumference formula for a circle?', '["πr", "2πr", "πr²", "2πr²"]', 1, 'Circumference = 2πr, where r is the radius.'),

-- Number Theory
('math', 'Which of these is a prime number?', '["15", "17", "21", "27"]', 1, '17 is prime; it is only divisible by 1 and 17.'),
('math', 'What is the least common multiple (LCM) of 4 and 6?', '["8", "10", "12", "24"]', 2, 'LCM(4,6) = 12 (smallest number divisible by both)'),
('math', 'Which number is divisible by 3?', '["41", "52", "63", "74"]', 2, '63 is divisible by 3 (6+3=9, which is divisible by 3)'),
('math', 'What is the greatest common divisor (GCD) of 12 and 18?', '["2", "3", "6", "9"]', 2, 'GCD(12,18) = 6 (largest number that divides both)'),
('math', 'How many prime numbers are there between 1 and 10?', '["3", "4", "5", "6"]', 1, 'Four primes: 2, 3, 5, 7'),

-- Advanced
('math', 'What is 15% of 80?', '["10", "12", "15", "18"]', 1, '15% × 80 = 0.15 × 80 = 12'),
('math', 'If a train travels 120 km in 2 hours, what is its speed?', '["40 km/h", "50 km/h", "60 km/h", "70 km/h"]', 2, 'Speed = Distance ÷ Time = 120 ÷ 2 = 60 km/h'),
('math', 'What is the next number in the sequence: 2, 4, 8, 16, __?', '["24", "28", "32", "36"]', 2, 'Each number doubles: 16 × 2 = 32'),
('math', 'What is 7²?', '["42", "47", "49", "51"]', 2, '7² = 7 × 7 = 49'),
('math', 'Round 3.7 to the nearest whole number', '["3", "4", "5", "6"]', 1, '3.7 rounds up to 4 because .7 ≥ .5');

-- ============================================
-- SCIENCE QUESTIONS (30)
-- ============================================

INSERT INTO questions (topic, question, options, correct_answer, explanation) VALUES

-- Biology
('science', 'What is the powerhouse of the cell?', '["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"]', 1, 'Mitochondria generate energy (ATP) for the cell through cellular respiration.'),
('science', 'What type of animal is a dolphin?', '["Fish", "Mammal", "Reptile", "Amphibian"]', 1, 'Dolphins are marine mammals that breathe air and nurse their young.'),
('science', 'How many chambers does a human heart have?', '["2", "3", "4", "5"]', 2, 'The human heart has 4 chambers: 2 atria and 2 ventricles.'),
('science', 'What is the largest organ in the human body?', '["Liver", "Brain", "Skin", "Heart"]', 2, 'The skin is the largest organ, covering the entire body.'),
('science', 'Which blood type is the universal donor?', '["A", "B", "AB", "O"]', 3, 'Type O negative blood can be given to any blood type (universal donor).'),
('science', 'What is photosynthesis?', '["Breaking down food", "Making food from sunlight", "Cell division", "Blood circulation"]', 1, 'Photosynthesis is the process plants use to convert sunlight into food (glucose).'),
('science', 'How many pairs of chromosomes do humans have?', '["21", "22", "23", "24"]', 2, 'Humans have 23 pairs of chromosomes (46 total).'),
('science', 'What is the smallest bone in the human body?', '["Stapes", "Femur", "Radius", "Tibia"]', 0, 'The stapes (stirrup bone) in the ear is the smallest bone.'),
('science', 'Which vitamin is produced when skin is exposed to sunlight?', '["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"]', 2, 'The body produces Vitamin D when exposed to sunlight.'),
('science', 'What is the study of plants called?', '["Zoology", "Botany", "Geology", "Ecology"]', 1, 'Botany is the scientific study of plants.'),

-- Chemistry
('science', 'What is the chemical formula for water?', '["H2O", "CO2", "O2", "H2O2"]', 0, 'Water is composed of two hydrogen atoms and one oxygen atom (H2O).'),
('science', 'What is the pH of pure water?', '["5", "6", "7", "8"]', 2, 'Pure water has a neutral pH of 7.'),
('science', 'What is the most abundant gas in Earth''s atmosphere?', '["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"]', 2, 'Nitrogen makes up about 78% of Earth''s atmosphere.'),
('science', 'At what temperature does water boil (at sea level)?', '["90°C", "100°C", "110°C", "120°C"]', 1, 'Water boils at 100°C (212°F) at sea level.'),
('science', 'What is the atomic number of carbon?', '["4", "6", "8", "12"]', 1, 'Carbon has 6 protons, giving it an atomic number of 6.'),
('science', 'Which element is the most abundant in the universe?', '["Oxygen", "Carbon", "Hydrogen", "Helium"]', 2, 'Hydrogen is the most abundant element, making up about 75% of the universe.'),
('science', 'What is the chemical symbol for sodium?', '["S", "So", "Na", "Sn"]', 2, 'Na is the symbol for sodium, from the Latin "natrium".'),
('science', 'What state of matter is fire?', '["Solid", "Liquid", "Gas", "Plasma"]', 3, 'Fire is plasma, the fourth state of matter, consisting of ionized gases.'),
('science', 'What is dry ice made of?', '["Frozen water", "Frozen nitrogen", "Frozen carbon dioxide", "Frozen oxygen"]', 2, 'Dry ice is solid carbon dioxide (CO2).'),
('science', 'What is the hardest mineral on the Mohs scale?', '["Quartz", "Corundum", "Diamond", "Topaz"]', 2, 'Diamond rates 10 on the Mohs hardness scale.'),

-- Physics
('science', 'What is the formula for acceleration?', '["Force × Mass", "Velocity × Time", "Change in velocity ÷ Time", "Distance ÷ Time"]', 2, 'Acceleration = Change in velocity ÷ Time taken'),
('science', 'What is the unit of electric current?', '["Volt", "Ohm", "Ampere", "Watt"]', 2, 'Electric current is measured in Amperes (A).'),
('science', 'What type of energy does a moving object have?', '["Potential", "Kinetic", "Thermal", "Chemical"]', 1, 'Kinetic energy is the energy of motion.'),
('science', 'What is the speed of sound in air (approximately)?', '["243 m/s", "343 m/s", "443 m/s", "543 m/s"]', 1, 'Sound travels at approximately 343 meters per second in air at 20°C.'),
('science', 'Who discovered gravity?', '["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"]', 1, 'Isaac Newton discovered the law of gravity in the 17th century.'),

-- Astronomy & Earth Science
('science', 'How long does it take for light from the Sun to reach Earth?', '["8 seconds", "8 minutes", "8 hours", "8 days"]', 1, 'Sunlight takes approximately 8 minutes and 20 seconds to reach Earth.'),
('science', 'Which planet is the largest in our solar system?', '["Saturn", "Jupiter", "Neptune", "Uranus"]', 1, 'Jupiter is the largest planet, with a diameter of about 143,000 km.'),
('science', 'What causes tides on Earth?', '["Wind", "Earth''s rotation", "Moon''s gravity", "Sun''s heat"]', 2, 'The Moon''s gravitational pull on Earth''s oceans causes tides.'),
('science', 'What is the center of the Earth called?', '["Mantle", "Crust", "Core", "Magma"]', 2, 'The core is the center of the Earth, divided into inner and outer core.'),
('science', 'How many planets are in our solar system?', '["7", "8", "9", "10"]', 1, 'There are 8 planets in our solar system (Pluto was reclassified as a dwarf planet in 2006).');
