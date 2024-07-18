const multipleFilter = (
  arr: Record<string, any>[],
  condition: Record<string, any>
) => {
  const next = (r, ks) => {
    if (ks.length === 0) return r
    const k = ks.pop()
    const res = r.filter((item) => item[k] === condition[k])
    return next(res, ks)
  }

  const keys = Object.keys(condition)
  return next(arr, keys)
}

const data = [
  {
    _id: '5a01de2a2186c67bd7128f28',
    index: 0,
    guid: 'c6d4670e-7d2b-4d51-bcd0-b6bf1b0b09c3',
    isActive: true,
    balance: '$1,056.74',
    picture: 'http://placehold.it/32x32',
    age: 32,
    eyeColor: 'blue',
    name: 'Dominguez Chan',
    gender: 'male',
    company: 'CAPSCREEN',
    email: 'dominguezchan@capscreen.com',
    phone: '+1 (869) 501-2614'
  },
  {
    _id: '5a01de2af21ff596408f7afd',
    index: 0,
    guid: '965348b0-f032-482d-9990-63ef68f4678b',
    isActive: false,
    balance: '$3,945.23',
    picture: 'http://placehold.it/32x32',
    age: 22,
    eyeColor: 'brown',
    name: 'Winifred Soto',
    gender: 'male',
    company: 'ECRATIC',
    email: 'winifredsoto@ecratic.com',
    phone: '+1 (911) 578-2918'
  },
  {
    _id: '5a01de2a1b73f40ff36666d9',
    index: 2,
    guid: 'cb2293d2-bf58-4243-9564-0d39803b214e',
    isActive: true,
    balance: '$2,209.89',
    picture: 'http://placehold.it/32x32',
    age: 29,
    eyeColor: 'blue',
    name: 'Barker Wooten',
    gender: 'male',
    company: 'DIGIAL',
    email: 'barkerwooten@digial.com',
    phone: '+1 (830) 426-3149'
  },
  {
    _id: '5a01de2aff3c0c852145474a',
    index: 3,
    guid: '4aa565c7-eb09-473f-a78a-6abf5f232769',
    isActive: true,
    balance: '$1,585.66',
    picture: 'http://placehold.it/32x32',
    age: 37,
    eyeColor: 'blue',
    name: 'Nola Cole',
    gender: 'female',
    company: 'AQUASSEUR',
    email: 'nolacole@aquasseur.com',
    phone: '+1 (860) 413-3850'
  },
  {
    _id: '5a01de2ab177df5381b27861',
    index: 4,
    guid: 'ad690385-767d-451e-9228-143d286f1129',
    isActive: true,
    balance: '$2,340.89',
    picture: 'http://placehold.it/32x32',
    age: 37,
    eyeColor: 'green',
    name: 'Castaneda Hopkins',
    gender: 'male',
    company: 'SHOPABOUT',
    email: 'castanedahopkins@shopabout.com',
    phone: '+1 (846) 504-2262'
  },
  {
    _id: '5a01de2ad4bde5cb94f221d2',
    index: 5,
    guid: '72a3bbb8-c23b-4dca-8633-80b21ee76220',
    isActive: false,
    balance: '$1,661.46',
    picture: 'http://placehold.it/32x32',
    age: 36,
    eyeColor: 'green',
    name: 'Clarke Harvey',
    gender: 'male',
    company: 'ENDIPIN',
    email: 'clarkeharvey@endipin.com',
    phone: '+1 (814) 517-3264'
  },
  {
    _id: '5a01de2a9909188ab35e4976',
    index: 6,
    guid: '9b4c628f-f43b-40e8-a397-0d3c143124b6',
    isActive: true,
    balance: '$2,190.96',
    picture: 'http://placehold.it/32x32',
    age: 20,
    eyeColor: 'brown',
    name: 'Potts Ramsey',
    gender: 'male',
    company: 'QUALITERN',
    email: 'pottsramsey@qualitern.com',
    phone: '+1 (855) 559-2844'
  }
]

const res = multipleFilter(data, {
  index: 0,
  gender: 'male'
})
console.log('----res', res)

export {}
