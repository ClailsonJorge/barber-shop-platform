import IMailTemplateProvider from '../models/IMailTemplateProvider'

export default class FakerMailTemplateProvider
    implements IMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail Template Content'
    }
}
