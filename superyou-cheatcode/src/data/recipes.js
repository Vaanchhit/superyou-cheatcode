export const recipes = [
    // --- Cheesecakes & Creamy Desserts (10) ---
    {
        id: 'c1',
        name: 'No-Bake SuperYou Wafer Cheesecake',
        category: 'Cheesecake',
        baseProteinRange: [12, 18],
        time: 20,
        noBake: true,
        superYouProduct: ['Protein Wafers', 'SuperYou Pro', 'FWB'],
        biscuitIntegration: 'FWB used as base for fortified wheat note.',
        ingredients: [
            '100g SuperYou Protein Wafers (crushed) or FWB',
            '200g Cream Cheese / Hung Curd',
            '1 scoop SuperYou Pro',
            '2 tbsp Honey',
            '1 tsp Vanilla',
            '50g Melted Dark Chocolate (optional)'
        ],
        steps: [
            'Crush wafers/FWB and mix with 1 tbsp melted butter; press into pan.',
            'Whisk cream cheese, SuperYou Pro, honey, and vanilla until smooth.',
            'Pour filling over crust and chill for 1 hour.',
            'Top with grated chocolate or fruit before serving.'
        ],
        whyItWorks: 'The wafer base gives crunch and fiber; SuperYou Pro keeps the texture silky while adding protein without bitterness.'
    },
    {
        id: 'c2',
        name: 'Chocolate-Coffee Protein Cheesecake',
        category: 'Cheesecake',
        baseProteinRange: [14, 20],
        time: 25,
        noBake: true,
        superYouProduct: ['ICB', 'SuperYou Pro'],
        biscuitIntegration: 'ICB crumbs used for deep cocoa crust.',
        ingredients: [
            '120g Indulgent Chocolate Biscuit (ICB) - crushed',
            '200g Mascarpone or Hung Curd',
            '1 scoop SuperYou Pro (Chocolate/Mixed)',
            '1 tbsp Instant Coffee (dissolved)',
            '2 tbsp Cocoa',
            '2 tbsp Honey'
        ],
        steps: [
            'Make chocolate crust with ICB crumbs and a little butter.',
            'Mix mascarpone, SuperYou Pro, coffee, cocoa, and sweetener.',
            'Pour over crust and chill for 2 hours.',
            'Dust with extra cocoa to serve.'
        ],
        whyItWorks: 'Coffee intensifies the chocolate, masking any protein aftertaste.'
    },
    {
        id: 'c3',
        name: 'Mango Yogurt Protein Cheesecake',
        category: 'Cheesecake',
        baseProteinRange: [12, 16],
        time: 20,
        noBake: true,
        superYouProduct: ['Protein Wafers', 'SuperYou Pro'],
        biscuitIntegration: 'Wafer crust provides light crunch.',
        ingredients: [
            '90g Protein Wafers',
            '200g Greek Yogurt',
            '1 scoop SuperYou Pro',
            '100g Mango Puree',
            '2 tbsp Honey'
        ],
        steps: [
            'Create crust with crushed wafers and butter.',
            'Mix yogurt, SuperYou Pro, mango puree, and honey.',
            'Pour and chill; top with fresh mango cubes.'
        ],
        whyItWorks: 'Yogurt acidity balances the mango sweetness, protein blends seamlessly.'
    },
    {
        id: 'c4',
        name: 'Paneer-Curd Fusion Cheesecake',
        category: 'Cheesecake',
        baseProteinRange: [18, 24],
        time: 25,
        noBake: true,
        superYouProduct: ['HPSB', 'SuperYou Pro'],
        biscuitIntegration: 'HPSB crumb base for extra protein lift.',
        ingredients: [
            '150g Paneer (whipped)',
            '1 scoop SuperYou Pro',
            '100g Hung Curd',
            '70g HPSB crumbs',
            'Sweetener to taste'
        ],
        steps: [
            'Whip paneer, curd, SuperYou Pro, and sweetener until smooth.',
            'Press HPSB crumbs into jars/mold.',
            'Fill with cheese mixture and chill.'
        ],
        whyItWorks: 'Paneer acts as a natural high-protein cream cheese alternative.'
    },
    {
        id: 'c5',
        name: 'Filter-Coffee Protein Cheesecake',
        category: 'Cheesecake',
        baseProteinRange: [12, 18],
        time: 30,
        noBake: true,
        superYouProduct: ['ICB', 'SuperYou Pro'],
        biscuitIntegration: 'ICB crumbs pair perfectly with coffee flavor.',
        ingredients: [
            'ICB Crumbs',
            '1 scoop SuperYou Pro (Vanilla/Choco)',
            '1 tbsp Filter Coffee concentrate',
            '150g Cream Cheese/Curd'
        ],
        steps: [
            'Prepare crust with ICB crumbs.',
            'Whip coffee concentrate, cream cheese, and Pro.',
            'Chill and garnish with espresso powder.'
        ],
        whyItWorks: 'Strong coffee cut through the dairy richness.'
    },
    {
        id: 'c6',
        name: 'Rose-Cardamom Cheesecake',
        category: 'Cheesecake',
        baseProteinRange: [12, 18],
        time: 20,
        noBake: true,
        superYouProduct: ['FWB', 'SuperYou Pro'],
        biscuitIntegration: 'FWB base adds earthy wheat note.',
        ingredients: [
            'FWB Crumbs',
            '1 scoop SuperYou Pro',
            'Rose Water',
            'Ground Cardamom',
            'Yogurt/Cream Cheese'
        ],
        steps: [
            'Make base with FWB crumbs.',
            'Mix filling with rose water and cardamom.',
            'Chill and top with pistachios.'
        ],
        whyItWorks: 'Floral notes pair beautifully with the neutral dairy base.'
    },
    {
        id: 'c7',
        name: 'Chocolate Hazelnut Protein Tart',
        category: 'Cheesecake',
        baseProteinRange: [15, 22],
        time: 30,
        noBake: true,
        superYouProduct: ['ICB', 'SuperYou Pro'],
        biscuitIntegration: 'ICB used for a rich chocolate crust.',
        ingredients: [
            'ICB Crumbs',
            '1 scoop SuperYou Pro',
            'Hazelnut Cocoa Spread',
            '150g Cream/Custard'
        ],
        steps: [
            'Form crust with ICB.',
            'Fold Pro into custard/cream along with hazelnut spread.',
            'Fill tart shells and chill.'
        ],
        whyItWorks: 'Rich hazelnut fats mask protein powder completely.'
    },
    {
        id: 'c8',
        name: 'Berry Protein Mousse Cake',
        category: 'Cheesecake / Creamy',
        baseProteinRange: [12, 16],
        time: 15,
        noBake: true,
        superYouProduct: ['Protein Wafers', 'SuperYou Pro'],
        biscuitIntegration: 'Wafers add texture contrast to mousse.',
        ingredients: [
            'Protein Wafers',
            '1 scoop SuperYou Pro',
            'Whipped Cream/Yogurt',
            'Berry Compote'
        ],
        steps: [
            'Layer crushed wafers at the bottom.',
            'Mix Pro into whipped cream/yogurt.',
            'Layer mousse and berry compote; set in fridge.'
        ],
        whyItWorks: 'Aerated texture makes this feel light despite high protein.'
    },
    {
        id: 'c9',
        name: 'Kulfi-Style Protein Cheesecake',
        category: 'Cheesecake / Creamy',
        baseProteinRange: [14, 20],
        time: 25,
        noBake: false, // Freeze
        superYouProduct: ['FWB', 'SuperYou Pro'],
        biscuitIntegration: 'FWB crumbs optional for texture.',
        ingredients: [
            'Paneer/Condensed Milk Alt',
            '1 scoop SuperYou Pro',
            'Cardamom & Saffron',
            'FWB Crumbs (optional)'
        ],
        steps: [
            'Mix base ingredients thoroughly.',
            'Freeze in moulds.',
            'Remove and serve cold.'
        ],
        whyItWorks: 'Mimics dense kulfi texture without sugar load.'
    },
    {
        id: 'c10',
        name: 'Diabetic-Friendly Vanilla Cheesecake',
        category: 'Cheesecake / Creamy',
        baseProteinRange: [12, 18],
        time: 20,
        noBake: true,
        superYouProduct: ['HPSB', 'SuperYou Pro'],
        biscuitIntegration: 'HPSB (low sugar) used for crust.',
        ingredients: [
            'HPSB Crumbs',
            '1 scoop SuperYou Pro',
            'Sugar Substitute',
            'Hung Curd'
        ],
        steps: [
            'Prepare crust with HPSB.',
            'Mix curd, Pro, and substitute.',
            'Set chilled.'
        ],
        whyItWorks: 'Low glycemic index ingredients for sustained energy.'
    },

    // --- Indian Desserts Reimagined (8) ---
    {
        id: 'i1',
        name: 'Date-Nut Protein Laddoos',
        category: 'Indian Sweet',
        baseProteinRange: [10, 16],
        time: 15,
        noBake: true,
        superYouProduct: ['HPSB', 'FWB', 'SuperYou Pro'],
        biscuitIntegration: 'HPSB or FWB crumbs provide binding + crunch.',
        ingredients: [
            '1 cup Dates (pitted)',
            '1 cup Mixed Nuts',
            '1 scoop SuperYou Pro',
            '1/2 cup HPSB or FWB crumbs'
        ],
        steps: [
            'Blitz dates and nuts into a sticky paste.',
            'Knead in SuperYou Pro and biscuit crumbs.',
            'Roll into balls and chill.'
        ],
        whyItWorks: 'Dates bind the powder naturally, hiding dryness.'
    },
    {
        id: 'i2',
        name: 'Protein Shrikhand Cups',
        category: 'Indian Sweet',
        baseProteinRange: [12, 18],
        time: 12,
        noBake: true,
        superYouProduct: ['SuperYou Pro'],
        biscuitIntegration: 'None (Pure creamy texture).',
        ingredients: [
            'Hung Curd / Paneer',
            '1 scoop SuperYou Pro',
            'Mango Pulp',
            'Cardamom'
        ],
        steps: [
            'Blend curd, SuperYou Pro, and mango pulp.',
            'Chill.',
            'Garnish with cardamom and saffron.'
        ],
        whyItWorks: 'Shrikhand is naturally protein-dense; we just boost it.'
    },
    {
        id: 'i3',
        name: 'Protein Sandesh Bites',
        category: 'Indian Sweet',
        baseProteinRange: [14, 20],
        time: 12,
        noBake: true,
        superYouProduct: ['HPSB', 'SuperYou Pro'],
        biscuitIntegration: 'HPSB dust used for coating/binding.',
        ingredients: [
            'Crumbled Paneer',
            '1 scoop SuperYou Pro',
            'Cardamom',
            'HPSB Dust'
        ],
        steps: [
            'Mix paneer, Pro, and cardamom.',
            'Shape into discs or balls.',
            'Chill to set.'
        ],
        whyItWorks: 'Chenna absorbs protein powder well.'
    },
    {
        id: 'i4',
        name: 'Protein Halwa Mini Bowls',
        category: 'Indian Sweet',
        baseProteinRange: [8, 14],
        time: 25,
        noBake: false,
        superYouProduct: ['FWB', 'SuperYou Pro'],
        biscuitIntegration: 'FWB crumb topping adds texture.',
        ingredients: [
            'Carrot / Moong Dal',
            'Ghee',
            'Jaggery',
            '1 scoop SuperYou Pro',
            'Nuts'
        ],
        steps: [
            'Cook vegetable/dal in ghee.',
            'Add jaggery and cook down.',
            'Stir in Pro at the end, garnish with nuts.'
        ],
        whyItWorks: 'Adding protein off-heat preserves texture.'
    },
    {
        id: 'i5',
        name: 'Chocolate Protein Barfi',
        category: 'Indian Sweet',
        baseProteinRange: [10, 16],
        time: 20,
        noBake: true,
        superYouProduct: ['ICB', 'SuperYou Pro'],
        biscuitIntegration: 'ICB base adds chocolatey crunch.',
        ingredients: [
            'Milk Powder Alt / Paneer',
            'Cocoa',
            '1 scoop SuperYou Pro',
            'ICB Crumbs'
        ],
        steps: [
            'Make mixture of paneer/milk powder and cocoa.',
            'Fold in Pro and ICB crumbs.',
            'Set in tray and cut squares.'
        ],
        whyItWorks: 'Fudgy texture hides powder dryness.'
    },
    {
        id: 'i6',
        name: 'Protein Rasmalai Bowl',
        category: 'Indian Sweet',
        baseProteinRange: [18, 25],
        time: 30,
        noBake: false,
        superYouProduct: ['SuperYou Pro'],
        biscuitIntegration: 'None.',
        ingredients: [
            'Paneer Discs',
            'Reduced Milk (Rabri)',
            '1 scoop SuperYou Pro',
            'Saffron'
        ],
        steps: [
            'Prepare paneer discs (sponge).',
            'Dissolve Pro in cooled reduced milk.',
            'Soak discs in milk.'
        ],
        whyItWorks: 'Sponge absorbs fortified milk efficiently.'
    },
    {
        id: 'i7',
        name: 'Protein Modak Filling',
        category: 'Indian Sweet',
        baseProteinRange: [10, 16],
        time: 35,
        noBake: false,
        superYouProduct: ['HPSB', 'SuperYou Pro'],
        biscuitIntegration: 'HPSB crumbs in filling for bulk.',
        ingredients: [
            'Coconut / Dates',
            '1 scoop SuperYou Pro',
            'HPSB Crumbs'
        ],
        steps: [
            'Mix coconut/dates with Pro and HPSB crumbs.',
            'Steam modak shells stuffed with filling.'
        ],
        whyItWorks: 'Strong coconut flavor masks protein.'
    },
    {
        id: 'i8',
        name: 'Protein Kheer Cups',
        category: 'Indian Sweet',
        baseProteinRange: [8, 14],
        time: 35,
        noBake: false,
        superYouProduct: ['FWB', 'SuperYou Pro'],
        biscuitIntegration: 'FWB used as breakfast biscuit side.',
        ingredients: [
            'Rice / Millet',
            'Milk',
            '1 scoop SuperYou Pro',
            'Jaggery / Honey'
        ],
        steps: [
            'Cook kheer until creamy.',
            'Fold in Pro at the end to retain texture.'
        ],
        whyItWorks: 'Creamy milk base suspends powder well.'
    },

    // --- Chocolate & Bakery-Style (7) ---
    {
        id: 'b1',
        name: 'Fudgy Protein Brownies',
        category: 'Chocolate',
        baseProteinRange: [12, 20],
        time: 35,
        noBake: false,
        superYouProduct: ['ICB', 'SuperYou Pro'],
        biscuitIntegration: 'ICB crumb topping.',
        ingredients: [
            'Cocoa',
            'Oat Flour',
            '1 scoop SuperYou Pro',
            'Eggs / Substitute',
            'ICB Crumbs'
        ],
        steps: [
            'Mix wet and dry ingredients.',
            'Pour into pan.',
            'Top with ICB crumbs and bake 20-25 mins.'
        ],
        whyItWorks: 'Cocoa allows for high protein packing without flavor loss.'
    },
    {
        id: 'b2',
        name: 'Protein Lava Mug Cake',
        category: 'Chocolate', // Also Quick Mug
        tags: ['Quick Mug Dessert'],
        baseProteinRange: [8, 12],
        time: 6,
        noBake: false,
        superYouProduct: ['SuperYou Pro'],
        biscuitIntegration: 'None.',
        ingredients: [
            '1 scoop SuperYou Pro',
            '2 tbsp Oat Flour',
            '1 tbsp Cocoa',
            '1 Egg / Flax egg',
            'Sweetener'
        ],
        steps: [
            'Mix all ingredients in a mug.',
            'Microwave for 60-90 seconds.'
        ],
        whyItWorks: 'Instant, warm, and gooey indulgence.'
    },
    {
        id: 'b3',
        name: 'Protein Banana Bread',
        category: 'Chocolate',
        baseProteinRange: [10, 18],
        time: 45,
        noBake: false,
        superYouProduct: ['Protein Wafers', 'SuperYou Pro'],
        biscuitIntegration: 'Wafer crumb swirl.',
        ingredients: [
            'Ripe Bananas',
            'Flour',
            '1 scoop SuperYou Pro',
            '2 tbsp Wafer Crumbs',
            'Nuts'
        ],
        steps: [
            'Mash bananas and mix batter.',
            'Fold in SuperYou Pro and Wafer crumbs.',
            'Bake until golden.'
        ],
        whyItWorks: 'Banana moisture prevents dry texture.'
    },
    {
        id: 'b4',
        name: 'Protein Wafer-Crust Cookies',
        category: 'Chocolate',
        baseProteinRange: [8, 14],
        time: 25,
        noBake: false,
        superYouProduct: ['HPSB', 'SuperYou Pro'],
        biscuitIntegration: 'HPSB base for cookie dough.',
        ingredients: [
            'HPSB Crumbs',
            '1 scoop SuperYou Pro',
            'Butter',
            'Egg / Substitute'
        ],
        steps: [
            'Combine ingredients to form dough.',
            'Shape cookies.',
            'Bake 10-12 mins.'
        ],
        whyItWorks: 'Biscuits provide structure for the cookie.'
    },
    {
        id: 'b5',
        name: 'Protein Tiramisu',
        category: 'Chocolate',
        baseProteinRange: [12, 18],
        time: 25,
        noBake: true,
        superYouProduct: ['ICB', 'FWB', 'SuperYou Pro'],
        biscuitIntegration: 'Layers of ICB/FWB.',
        ingredients: [
            'Coffee',
            'Mascarpone / Curd',
            '1 scoop SuperYou Pro',
            'ICB / FWB layers'
        ],
        steps: [
            'Dip biscuits in coffee.',
            'Layer with protein-cream mixture.',
            'Chill.'
        ],
        whyItWorks: 'Coffee + Cream is a classic combo that handles protein well.'
    },
    {
        id: 'b6',
        name: 'Protein Choco Truffles',
        category: 'Chocolate',
        baseProteinRange: [6, 10],
        time: 15,
        noBake: true,
        superYouProduct: ['Protein Wafers', 'SuperYou Pro'],
        biscuitIntegration: 'Wafer crumbs inside.',
        ingredients: [
            '1 scoop SuperYou Pro',
            'Cocoa',
            'Dates',
            'Wafer Crumbs'
        ],
        steps: [
            'Blend ingredients into a paste.',
            'Roll into balls.',
            'Chill.'
        ],
        whyItWorks: 'Dates provide perfect binding texture.'
    },
    {
        id: 'b7',
        name: 'Protein Biscuit Cake',
        category: 'Chocolate',
        baseProteinRange: [12, 18],
        time: 25,
        noBake: true,
        superYouProduct: ['FWB', 'SuperYou Pro'],
        biscuitIntegration: 'Main structure is FWB.',
        ingredients: [
            'Layers of Cream',
            'FWB',
            'SuperYou Pro blended filling'
        ],
        steps: [
            'Alternate layers of FWB and protein cream.',
            'Set in fridge.'
        ],
        whyItWorks: 'Classic fridge cake made functional.'
    },

    // --- Cold & Quick Indulgence (5) ---
    {
        id: 'q1',
        name: 'No-Churn Protein Ice-Cream',
        category: 'Cold Dessert',
        baseProteinRange: [12, 20],
        time: 15,
        noBake: true, // Freeze
        superYouProduct: ['Protein Wafers', 'SuperYou Pro'],
        biscuitIntegration: 'Wafer crumb swirl.',
        ingredients: [
            'Condensed Milk Alt',
            'Cream / Curd',
            '1-2 scoops SuperYou Pro',
            'Flavoring',
            'Wafer Crumb Swirl'
        ],
        steps: [
            'Whisk base ingredients.',
            'Fold in crumbs.',
            'Freeze 4-6 hours.'
        ],
        whyItWorks: 'Creamy fat content carries the protein smoothly.'
    },
    {
        id: 'q2',
        name: 'Protein Milkshake (SuperFood)',
        category: 'Cold Dessert',
        baseProteinRange: [18, 25],
        time: 4,
        noBake: true,
        superYouProduct: ['SuperYou Pro'],
        biscuitIntegration: 'HPSB on the side.',
        ingredients: [
            'Milk',
            '1-2 scoops SuperYou Pro',
            'Banana / Cocoa',
            'Ice'
        ],
        steps: [
            'Blend high speed.',
            'Serve immediately.'
        ],
        whyItWorks: 'Liquid form factor is the easiest protein delivery.'
    },
    {
        id: 'q3',
        name: 'Protein Smoothie Bowl',
        category: 'Cold Dessert',
        baseProteinRange: [12, 20],
        time: 7,
        noBake: true,
        superYouProduct: ['Protein Wafers', 'SuperYou Pro'],
        biscuitIntegration: 'Wafer crumb topping.',
        ingredients: [
            'Greek Yogurt / Curd',
            '1 scoop SuperYou Pro',
            'Mixed Fruits',
            'Wafer Crumb Topping'
        ],
        steps: [
            'Blend yogurt, Pro, and fruit until thick.',
            'Top with wafers.'
        ],
        whyItWorks: 'Contrast of cold smoothness and crunchy wafers.'
    },
    {
        id: 'q4',
        name: 'Protein Chocolate Mousse',
        category: 'Cold Dessert',
        baseProteinRange: [8, 14],
        time: 12,
        noBake: true,
        superYouProduct: ['SuperYou Pro'],
        biscuitIntegration: 'None.',
        ingredients: [
            'Whipped Cream / Curd',
            '1 scoop SuperYou Pro (Choco)',
            'Melted Chocolate'
        ],
        steps: [
            'Fold Pro into whipped cream/curd.',
            'Swirl in melted chocolate.',
            'Set.'
        ],
        whyItWorks: 'Aeration hides density of protein.'
    },
    {
        id: 'q5',
        name: 'Protein Frozen Yogurt Pops',
        category: 'Cold Dessert',
        baseProteinRange: [8, 12],
        time: 10,
        noBake: true, // Freeze
        superYouProduct: ['Protein Wafers', 'SuperYou Pro'],
        biscuitIntegration: 'Wafer crumbs in center.',
        ingredients: [
            'Yogurt',
            '1 scoop SuperYou Pro',
            'Fruit Puree',
            'Wafer Crumbs'
        ],
        steps: [
            'Mix yogurt, Pro, and puree.',
            'Pour into molds with a heavy sprinkle of crumbs.',
            'Freeze.'
        ],
        whyItWorks: 'Refreshing and portion-controlled.'
    }
];
