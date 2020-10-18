import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import CompanyCard from '@/components/CompanyCard.vue'

const FULL_COMPANY = {
  slug: '3d-repo',
  createdBy: {
    slug: 'testuser',
    name: 'Joseph Banks',
    bio:
      'Politics ball little miss admit maintain couple.\nInclude parent draw challenge total. Training avoid later design tough. Left stuff family pay health because every.',
    location: 'New Dianatown',
    avatarUrl: null,
  },
  threadId: 11,
  createdAt: '2020-09-14T05:23:32.205711Z',
  clapCount: 1,
  threadSize: 2,
  lastRevisionId: 1,
  articles: [],
  logoUrl:
    'https://aecworks-bucket-staging.s3.amazonaws.com/__sized__/images/29930a4516ed439fb07ec38413464efd-crop-c0-5__0-5-80x80.png',
  coverUrl:
    'https://aecworks-bucket-staging.s3.amazonaws.com/__sized__/images/fede69a591e84008b535767e2212632c-crop-c0-5__0-5-800x400.png',
  name: '3D Repo',
  description: 'Cloud-Based BIM',
  website: 'https://3drepo.com',
  location: 'London, UK',
  twitter: null,
  crunchbaseId: '3d-repo',
  logo: 530,
  cover: 531,
  hashtags: ['webapp', 'issuetracking', 'changemanagement'],
}

const factory = (company = FULL_COMPANY) =>
  shallowMount(CompanyCard, {
    propsData: {
      company,
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  })

describe('CompanyCard.vue', () => {
  it('Renders a full company with logo and cover', () => {
    const wrapper = factory(FULL_COMPANY)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Renders a card without a cover', () => {
    const company = { ...FULL_COMPANY, coverUrl: null }
    const wrapper = factory(company)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Renders a card without a logo', () => {
    const company = { ...FULL_COMPANY, logoUrl: null }
    const wrapper = factory(company)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Renders a card without a cover or a logo', () => {
    const company = { ...FULL_COMPANY, logoUrl: null, coverUrl: null }
    const wrapper = factory(company)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
