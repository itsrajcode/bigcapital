exports.up = function (knex) {
  return knex('subscription_plans').insert([
    // Ease Basic
    {
      name: 'Ease Basic (Monthly)',
      slug: 'capital-basic-monthly',
      price: 10,
      active: true,
      currency: 'USD',
      invoice_period: 1,
      invoice_interval: 'month',
      lemon_variant_id: '446152',
      // lemon_variant_id: '450016',
    },
    {
      name: 'Ease Basic (Annually)',
      slug: 'capital-basic-annually',
      price: 90,
      active: true,
      currency: 'USD',
      invoice_period: 1,
      invoice_interval: 'year',
      lemon_variant_id: '446153',
      // lemon_variant_id: '450018',
    },

    // # Ease Essential
    {
      name: 'Ease Essential (Monthly)',
      slug: 'capital-essential-monthly',
      price: 20,
      active: true,
      currency: 'USD',
      invoice_period: 1,
      invoice_interval: 'month',
      lemon_variant_id: '446155',
      // lemon_variant_id: '450028',
    },
    {
      name: 'Ease Essential (Annually)',
      slug: 'capital-essential-annually',
      price: 180,
      active: true,
      invoice_period: 1,
      invoice_interval: 'year',
      lemon_variant_id: '446156',
      // lemon_variant_id: '450029',
    },

    // # Ease Plus
    {
      name: 'Ease Plus (Monthly)',
      slug: 'capital-plus-monthly',
      price: 25,
      active: true,
      invoice_period: 1,
      invoice_interval: 'month',
      lemon_variant_id: '446165',
      // lemon_variant_id: '450031',
    },
    {
      name: 'Ease Plus (Annually)',
      slug: 'capital-plus-annually',
      price: 228,
      active: true,
      invoice_period: 1,
      invoice_interval: 'year',
      lemon_variant_id: '446164',
      // lemon_variant_id: '450032',
    },

    // # Ease Big
    {
      name: 'Ease Big (Monthly)',
      slug: 'capital-big-monthly',
      price: 40,
      active: true,
      invoice_period: 1,
      invoice_interval: 'month',
      lemon_variant_id: '446167',
      // lemon_variant_id: '450024',
    },
    {
      name: 'Ease Big (Annually)',
      slug: 'capital-big-annually',
      price: 360,
      active: true,
      invoice_period: 1,
      invoice_interval: 'year',
      lemon_variant_id: '446168',
      // lemon_variant_id: '450025',
    },
  ]);
};

exports.down = function (knex) {};
