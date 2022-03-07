import Experience from '../Experience.js'
import GLTFViewer from '../Viewers/GLTFViewer.js'
import FBXViewer from '../Viewers/FBXViewer.js'
import ColladaViewer from '../Viewers/ColladaViewer.js'
import OBJViewer from '../Viewers/OBJViewer.js'
import MMDViewer from '../Viewers/MMDViewer.js'
import IFCViewer from '../Viewers/ifcLoader/IFCViewer.js'
import BVHViewer from '../Viewers/BVHViewer.js'
import PLYViewer from '../Viewers/PLYViewer.js'
import STLViewer from '../Viewers/STLViewer.js'
import MDDViewer from '../Viewers/MDDViewer.js'
import XYZViewer from '../Viewers/XYZViewer.js'
import KMZViewer from '../Viewers/KMZViewer.js'
import NRRDViewer from '../Viewers/NRRDViewer.js'
import PCDViewer from '../Viewers/PCDViewer.js'
import PRWMViewer from '../Viewers/PRWMViewer.js'
import TiltViewer from '../Viewers/TILTViewer.js'
import VRMViewer from '../Viewers/VRMViewer.js'
import VRMLViewer from '../Viewers/VRMLViewer.js'
import VTKViewer from '../Viewers/VTKViewer.js'
import TDSViewer from '../Viewers/TDSViewer.js'
import ThreeMFViewer from '../Viewers/ThreeMFViewer.js'
import AMFViewer from '../Viewers/AMFViewer.js'
export default class ModelViewer
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.model = this.experience.model
        this.time = this.experience.time

        this.loadedModel = null

        this.startLoading()
    }

    startLoading()
    {
        switch(this.model.type)
        {
            case 'gltf':
            case 'glb':
                this.gltfView = new GLTFViewer()
                break;

            /** 인기 포맷 */
            case 'fbx':
                this.fbxView = new FBXViewer()
                break;
            
            /** 인기 포맷 */
            case 'dae':
                this.colladaView = new ColladaViewer()
                break;

            /** 인기 포맷 */
            case 'obj':
                this.objView = new OBJViewer()
                break;

            case 'pmx':
                this.mmdView = new MMDViewer()
                break;

            case 'ifc':
                this.ifcView = new IFCViewer()
                break;

            case 'bvh':
                this.bvhView = new BVHViewer()
                break;

            case 'ply':
                this.plyView = new PLYViewer()
                break;

            /** 인기 포맷 */
            case 'stl':
                this.stlView = new STLViewer()
                break;

            case 'mdd':
                this.mddView = new MDDViewer()
                break;

            case 'xyz':
                this.xyzView = new XYZViewer()
                break;

            case 'kmz':
                this.kmzView = new KMZViewer()
                break;

            case 'nrrd':
                this.nrrdView = new NRRDViewer()
                break;

            case 'pcd':
                this.pcdView = new PCDViewer()
                break;

            case 'prwm':
                this.prwmView = new PRWMViewer()
                break;
            
            case 'tilt':
                this.tiltView = new TiltViewer()
                break;
            
            case 'vrm':
                this.vrmView = new VRMViewer()
                break;

            /** 인기 포맷 */
            case 'wrl':
                this.vrmlView = new VRMLViewer()
                break;

            case 'vtp':
            case 'vtk':
                this.vtkView = new VTKViewer()
                break;

            /** 인기 포맷 */
            case '3ds':
                this.tdsView = new TDSViewer()
                break;

            /** 인기 포맷 */
            case 'amf':  // 3d 프린터 포맷
                this.amfView = new AMFViewer()
                break;

            /** 인기 포맷 */
            case '3mf':  // 3d 프린터 포맷
                this.threeMView = new ThreeMFViewer()
                break;

            default:
                break;
        }
    }

    update()
    {
        if(this.gltfView)
            this.gltfView.update()
        if(this.fbxView)
            this.fbxView.update()
        if(this.bvhView)
            this.bvhView.update()
        if(this.mddView)
            this.mddView.update()
        if(this.fdsView)
            this.fdsView.update()
        if(this.tdsView)
            this.tdsView.update()
    }
}