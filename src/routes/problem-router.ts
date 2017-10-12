import {Request, Response, Router} from "express";
import {ProblemDao} from "../storage/problem-dao";
import {Problem} from "../model/problem.model";

export class ProblemRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', ProblemRouter.getAll);
        this.router.get('/:id', ProblemRouter.getOne);
        this.router.post('/', ProblemRouter.save);
        this.router.put('/', ProblemRouter.edit);
    }

    private static getAll(response: Response) {
        ProblemDao.getAll().then((problems: Problem[]) => {
            response.status(200).send(problems)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static getOne(request: Request, response: Response) {
        let problemId: number = parseInt(request.params.id);

        ProblemDao.get(problemId).then((problem: Problem) => {
            if (problem) {
                response.status(200).send(problem);
            } else {
                response.status(404).send('No problem found by the given id');
            }
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static save(request: Request, response: Response) {
        ProblemDao.save(request.body).then(() => {
            response.status(200).send(request.body)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static edit(request: Request, response: Response) {
        ProblemDao.edit(request.body).then(() => {
            response.status(200).send(request.body)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

}

const problemRouter = new ProblemRouter();
problemRouter.init();

export default problemRouter.router;
