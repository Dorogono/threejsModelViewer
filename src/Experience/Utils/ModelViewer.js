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
        this.type = this.model.type
        this.time = this.experience.time

        this.loadedModel = null

        this.startLoading()
    }

    startLoading()
    {
        if(this.type === 'gltf' || this.type === 'glb')
        {
            this.gltfView = new GLTFViewer()
        }
        else if(this.type === 'fbx')
        {
            this.fbxView = new FBXViewer()
        }
        else if(this.type === 'dae')
        {
            this.colladaView = new ColladaViewer()
        }
        else if(this.type === 'obj')
        {
            this.objView = new OBJViewer()
        }
        else if(this.type === 'pmx')
        {
            this.mmdView = new MMDViewer()
        }
        else if(this.type === 'ifc')
        {
            this.ifcView = new IFCViewer()
        }
        else if(this.type === 'bvh')
        {
            this.bvhView = new BVHViewer()
        }
        else if(this.type === 'ply')
        {
            this.plyView = new PLYViewer()
        }
        else if(this.type === 'stl')
        {
            this.stlView = new STLViewer()
        }
        else if(this.type === 'mdd')
        {
            this.mddView = new MDDViewer()
        }
        else if(this.type === 'xyz')
        {
            this.xyzView = new XYZViewer()
        }
        else if(this.type === 'kmz')
        {
            this.kmzView = new KMZViewer()
        }
        else if(this.type === 'nrrd')
        {
            this.nrrdView = new NRRDViewer()
        }
        else if(this.type === 'pcd')
        {
            this.pcdView = new PCDViewer()
        }
        else if(this.type === 'prwm')
        {
            this.prwmView = new PRWMViewer()
        }
        else if(this.type === 'tilt')
        {
            this.tiltView = new TiltViewer()
        }
        else if(this.type === 'vrm')
        {
            this.vrmView = new VRMViewer()
        }
        else if(this.type === 'wrl')
        {
            this.vrmlView = new VRMLViewer()
        }
        else if(this.type === 'vtp' || this.type === 'vtk')
        {
            this.vtkView = new VTKViewer()
        }
        else if(this.type === '3ds')
        {
            this.tdsView = new TDSViewer()
        }
        else if(this.type === amf)
        {
            this.amfView = new AMFViewer()
        }
        else if(this.type === '3mf')
        {
            this.threeMView = new ThreeMFViewer()
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